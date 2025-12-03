package com.poll.dtos;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class PollDetailsDTO {
   private PollDTO pollDTO;
   private List<CommentDTO> commentDTOs;
   private Long likesCount;
   private Long commentsCount;
    
}
