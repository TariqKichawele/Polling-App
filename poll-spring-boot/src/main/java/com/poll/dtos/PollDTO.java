package com.poll.dtos;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class PollDTO {
    private Long id;
    private String question;
    private Date postedDate;
    private Date expiredAt;
    private List<String> options;
    private Integer totalVoteCount;
    private boolean isExpired;
    private Long userId;
    private String username;
    private List<OptionsDTO> optionsDTO;
    private boolean voted;
    private boolean isLiked;


}
