package com.poll.controllers.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import com.poll.services.auth.AuthService;
import com.poll.services.jwt.UserService;
import com.poll.dtos.AuthenticationRequest;
import com.poll.dtos.AuthenticationResponse;
import com.poll.dtos.SignupRequest;
import com.poll.dtos.UserDTO;
import com.poll.entities.User;
import com.poll.repositories.UserRepository;
import com.poll.util.JwtUtil;

import java.util.Collections;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    private final UserService userService;

    private final JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            if (authService.hasUserWithEmail(signupRequest.getEmail())) {
                return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("message", "User already exists"));
            }

            UserDTO userDTO = authService.createUser(signupRequest);
            
            if (userDTO == null) {
                return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message", "Failed to create user"));
            }

            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(signupRequest.getEmail());
            String jwtToken = jwtUtil.generateToken(userDetails, userDTO.getId());

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();
            authenticationResponse.setJwtToken(jwtToken);
            authenticationResponse.setName(userDTO.getFirstName() + " " + userDTO.getLastName());
            authenticationResponse.setMessage("User registered successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(authenticationResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );

            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
            Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                String jwt = jwtUtil.generateToken(userDetails, user.getId());

                AuthenticationResponse authenticationResponse = new AuthenticationResponse();
                authenticationResponse.setJwtToken(jwt);
                authenticationResponse.setName(user.getFirstName() + " " + user.getLastName());
                authenticationResponse.setMessage("Login successful");

                return ResponseEntity.status(HttpStatus.OK).body(authenticationResponse);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "User not found"));
        }
        catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "User not found"));
        }
        catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "User is disabled"));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }
    
}
