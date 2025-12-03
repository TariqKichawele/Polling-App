package com.poll.services.auth;

import com.poll.dtos.SignupRequest;
import com.poll.dtos.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupRequest signupRequest);
    boolean hasUserWithEmail(String email);
}
