package com.poll.dtos;

import lombok.Data;
import com.poll.enums.UserRole;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}