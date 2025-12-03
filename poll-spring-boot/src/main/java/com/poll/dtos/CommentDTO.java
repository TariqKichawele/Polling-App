package com.poll.dtos;

import java.util.Date;

import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private Date createdAt;
    private String content;
    private String username;
    private Long userId;
    private Long pollId;
    private boolean isOwner;
}
