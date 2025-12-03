package com.poll.services.auth;

import org.springframework.stereotype.Service;

import com.poll.dtos.SignupRequest;
import com.poll.dtos.UserDTO;
import com.poll.entities.User;
import com.poll.enums.UserRole;
import lombok.RequiredArgsConstructor;
import com.poll.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setRole(UserRole.USER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        
        userRepository.save(user);
        
        return user.getUserDTO();
    }


}
