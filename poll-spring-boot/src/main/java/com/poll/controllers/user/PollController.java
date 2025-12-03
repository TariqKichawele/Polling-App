package com.poll.controllers.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Collections;
import java.util.List;

import com.poll.dtos.LikesDTO;
import com.poll.dtos.CommentDTO;
import com.poll.dtos.PollDTO;
import com.poll.dtos.VoteDTO;
import com.poll.dtos.PollDetailsDTO;
import lombok.RequiredArgsConstructor;
import com.poll.services.user.PollService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class PollController {

    private final PollService pollService;
    
    @PostMapping("/poll")
    public ResponseEntity<?> postPoll(@RequestBody PollDTO pollDTO) {
        try {
            PollDTO createdPoll = pollService.postPoll(pollDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPoll);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @DeleteMapping("/poll/{pollId}")
    public ResponseEntity<?> deletePoll(@PathVariable Long pollId) {
        try {
            pollService.deletePoll(pollId);
            return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Poll deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @GetMapping("/polls")
    public ResponseEntity<?> getAllPolls() {
        try {
            List<PollDTO> polls = pollService.getAllPolls();
            return ResponseEntity.status(HttpStatus.OK).body(polls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @GetMapping("/my-polls")
    public ResponseEntity<?> getMyPolls() {
        try {
            List<PollDTO> polls = pollService.getMyPolls();
            return ResponseEntity.status(HttpStatus.OK).body(polls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @PostMapping("/poll/like/{pollId}")
    public ResponseEntity<?> likePoll(@PathVariable Long pollId) {
        try {
            LikesDTO likes = pollService.likePoll(pollId);
            return ResponseEntity.status(HttpStatus.OK).body(likes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @DeleteMapping("/poll/unlike/{pollId}")
    public ResponseEntity<?> unlikePoll(@PathVariable Long pollId) {
        try {
            pollService.unlikePoll(pollId);
            return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Unlike successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @PostMapping("/poll/comment")
    public ResponseEntity<?> commentOnPoll(@RequestBody CommentDTO commentDTO) {
        try {
            CommentDTO comment = pollService.commentOnPoll(commentDTO);
            return ResponseEntity.status(HttpStatus.OK).body(comment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @DeleteMapping("/poll/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            pollService.deleteComment(commentId);
            return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Comment deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @PostMapping("/poll/vote")
    public ResponseEntity<?> voteOnPoll(@RequestBody VoteDTO voteDTO) {
        try {
            VoteDTO vote = pollService.voteOnPoll(voteDTO);
            return ResponseEntity.status(HttpStatus.OK).body(vote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }

    @GetMapping("/poll/details/{pollId}")
    public ResponseEntity<?> getPollDetails(@PathVariable Long pollId) {
        try {
            PollDetailsDTO pollDetails = pollService.getPollDetails(pollId);
            return ResponseEntity.status(HttpStatus.OK).body(pollDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Internal server error" + e.getMessage()));
        }
    }
}
