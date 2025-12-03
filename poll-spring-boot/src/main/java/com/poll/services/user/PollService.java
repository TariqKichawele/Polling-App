package com.poll.services.user;

import java.util.List;

import com.poll.dtos.PollDTO;
import com.poll.dtos.LikesDTO;
import com.poll.dtos.CommentDTO;
import com.poll.dtos.VoteDTO;
import com.poll.dtos.PollDetailsDTO;

public interface PollService {
    PollDTO postPoll(PollDTO pollDTO);
    void deletePoll(Long pollId);
    List<PollDTO> getAllPolls();
    List<PollDTO> getMyPolls();
    LikesDTO likePoll(Long pollId);
    void unlikePoll(Long pollId);
    CommentDTO commentOnPoll(CommentDTO commentDTO);
    void deleteComment(Long commentId);
    VoteDTO voteOnPoll(VoteDTO voteDTO);
    PollDetailsDTO getPollDetails(Long pollId);
}
