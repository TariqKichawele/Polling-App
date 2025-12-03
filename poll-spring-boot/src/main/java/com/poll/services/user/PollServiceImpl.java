package com.poll.services.user;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poll.dtos.*;
import com.poll.entities.*;
import com.poll.repositories.*;
import com.poll.util.JwtUtil;

import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService {

    private final JwtUtil jwtUtil;
    private final PollRepository pollRepository;
    private final OptionsRepository optionsRepository;
    private final JavaMailSender mailSender;
    private final VoteRepository voteRepository;
    private final LikesRepository likesRepository;
    private final CommentRepository commentRepository;

    @Override
    public PollDTO postPoll(PollDTO pollDTO) {
        User loggedInUser = jwtUtil.getLoggedInUser();
        if (loggedInUser != null) {
            Poll poll = new Poll();
            poll.setQuestion(pollDTO.getQuestion());
            poll.setPostedDate(new Date());
            poll.setExpiredAt(pollDTO.getExpiredAt());
            poll.setUser(loggedInUser);
            poll.setTotalVoteCount(0);
            Poll createdPoll = pollRepository.save(poll);

            List<Options> options = new ArrayList<>();

            for (String optionTitle : pollDTO.getOptions()) {
                Options option = new Options();
                option.setTitle(optionTitle);
                option.setPoll(createdPoll);
                option.setVoteCount(0);
                options.add(option);
            }
            
            List<Options> savedOptions = optionsRepository.saveAll(options);
            poll.setOptions(savedOptions);
            pollRepository.save(poll);

            if (createdPoll.getId() != null) {
                try {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                    mimeMessageHelper.setFrom("tkichawele@gmail.com");
                    mimeMessageHelper.setTo(loggedInUser.getEmail());
                    mimeMessageHelper.setSubject("Poll Created");
                    mimeMessageHelper.setText("Dear " + loggedInUser.getFirstName() + ",<br><br>Your poll has been created successfully.<br><br>Thank you for using our service.");
                    mailSender.send(mimeMessage);
                    System.out.println("Mail sent successfully to " + loggedInUser.getEmail());
                } catch (Exception e) {
                    System.err.println("Error sending mail to " + loggedInUser.getEmail() + ": " + e.getMessage());
                }
            }   

            return getPollDTOInService(createdPoll);
        }
       
        return null;
    }

    @Override
    @Transactional
    public void deletePoll(Long pollId) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Poll not found"));
        User loggedInUser = jwtUtil.getLoggedInUser();
        
        if (loggedInUser != null && poll.getUser().getId().equals(loggedInUser.getId())) {
            // First delete all votes associated with this poll
            voteRepository.deleteByPollId(pollId);
            
            // Then delete the poll (options will be cascade deleted)
            pollRepository.deleteById(pollId);
        } else {
            throw new RuntimeException("Unauthorized to delete this poll");
        }
    }

    @Override
    public List<PollDTO> getAllPolls() {
        List<Poll> polls = pollRepository.findAll();
        return polls.stream().map(this::getPollDTOInService).collect(Collectors.toList());
    }

    @Override
    public List<PollDTO> getMyPolls() {
        User loggedInUser = jwtUtil.getLoggedInUser();
        
        if (loggedInUser != null) {
            return pollRepository.findAllByUserId(loggedInUser.getId())
                .stream()
                .sorted(Comparator.comparing(Poll::getPostedDate).reversed())
                .map(this::getPollDTOInService)
                .collect(Collectors.toList());
        }

        throw new EntityNotFoundException("User not found");
    }

    public PollDTO getPollDTOInService(Poll poll) {
        User loggedInUser = jwtUtil.getLoggedInUser();
        if (loggedInUser == null) {
            return null;
        }
        PollDTO pollDTO = new PollDTO();
        pollDTO.setId(poll.getId());
        pollDTO.setQuestion(poll.getQuestion());
        pollDTO.setPostedDate(poll.getPostedDate());
        pollDTO.setExpiredAt(poll.getExpiredAt());
        pollDTO.setExpired(poll.getExpiredAt() != null && poll.getExpiredAt().before(new Date()));
        pollDTO.setPostedDate(poll.getPostedDate());
        pollDTO.setOptionsDTO(poll.getOptions().stream().map(
            options -> this.getOptionsDTO(options, loggedInUser.getId(), poll.getId())).collect(Collectors.toList()));
        pollDTO.setTotalVoteCount(poll.getTotalVoteCount());

        User pollOwner = poll.getUser();

        if (loggedInUser != null && pollOwner.getId().equals(loggedInUser.getId())) {
            pollDTO.setUsername("You");
        } else {
            pollDTO.setUsername(pollOwner.getFirstName() + " " + pollOwner.getLastName());
        }

        pollDTO.setUserId(pollOwner.getId());

        if (loggedInUser != null) {
            pollDTO.setVoted(voteRepository.existsByPollIdAndUserId(poll.getId(), loggedInUser.getId()));
        }

        return pollDTO;
    }
    
    public OptionsDTO getOptionsDTO(Options options, Long userId, Long pollId) {
        OptionsDTO optionsDTO = new OptionsDTO();
        optionsDTO.setId(options.getId());
        optionsDTO.setTitle(options.getTitle());
        optionsDTO.setPollId(options.getPoll().getId());
        optionsDTO.setVoteCount(options.getVoteCount());
        optionsDTO.setUserVotedThisOption(voteRepository.existsByPollIdAndUserIdAndOptionId(pollId, userId, options.getId()));
        return optionsDTO;
    }

    @Override
    public LikesDTO likePoll(Long pollId) {
       Optional<Poll> poll = pollRepository.findById(pollId);

       User user = jwtUtil.getLoggedInUser();

       if (user != null && poll.isPresent()) {
        Likes like = new Likes();
        like.setUser(user);
        like.setPoll(poll.get());
        return likesRepository.save(like).getLikesDTO();
       }

       return null;
    }

    @Override
    public CommentDTO commentOnPoll(CommentDTO commentDTO) {
        Optional<Poll> optionalPoll = pollRepository.findById(commentDTO.getPollId());
        User user = jwtUtil.getLoggedInUser();
        if (user != null && optionalPoll.isPresent()) {
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setPoll(optionalPoll.get());
            comment.setContent(commentDTO.getContent());
            comment.setCreatedAt(new Date());
            return commentRepository.save(comment).getCommentDTO();
        }
        return null;
    }

    @Override
    public VoteDTO voteOnPoll(VoteDTO voteDTO) {
        Optional<Poll> optionalPoll = pollRepository.findById(voteDTO.getPollId());
        Optional<Options> optionalOption = optionsRepository.findById(voteDTO.getOptionId());
        User user = jwtUtil.getLoggedInUser();

        if (user != null && optionalPoll.isPresent() && optionalOption.isPresent()) {
            Vote vote = new Vote();
            if (optionalPoll.get().getExpiredAt().before(new Date())) {
                throw new RuntimeException("Poll has expired");
            }
            vote.setUser(user);
            vote.setPoll(optionalPoll.get());
            vote.setOption(optionalOption.get());
            vote.setPostedDate(new Date());
            optionalPoll.get().setTotalVoteCount(optionalPoll.get().getTotalVoteCount() + 1);
            optionalOption.get().setVoteCount(optionalOption.get().getVoteCount() + 1);
            optionsRepository.save(optionalOption.get());
            
            Vote savedVote = voteRepository.save(vote);
            pollRepository.save(optionalPoll.get());
            return savedVote.getVoteDTO();
        }
        return null;
    }

    @Override
    public PollDetailsDTO getPollDetails(Long pollId) {
        Optional<Poll> optionalPoll = pollRepository.findById(pollId);
        User user = jwtUtil.getLoggedInUser();

        if (optionalPoll.isPresent() && user != null ) {
            List<Likes> likes = likesRepository.findAllByPollId(optionalPoll.get().getId());
            List<Comment> comments = commentRepository.findAllByPollId(optionalPoll.get().getId());

            PollDetailsDTO pollDetailsDTO = new PollDetailsDTO();
            pollDetailsDTO.setPollDTO(getPollDTOInService(optionalPoll.get()));
            pollDetailsDTO.getPollDTO().setLiked(likesRepository.findByPollIdAndUserId(pollId, user.getId()).isPresent());

            List<CommentDTO> commentDTOList = comments.stream().map(comment -> {
                CommentDTO commentDTO = comment.getCommentDTO();
                if (comment.getUser().getId().equals(user.getId())) {
                    commentDTO.setUsername("You");
                }
                return commentDTO;
            }).toList();

            pollDetailsDTO.setCommentDTOs(commentDTOList);
            pollDetailsDTO.setLikesCount((long)likes.size());
            pollDetailsDTO.setCommentsCount((long)comments.size());
            
            return pollDetailsDTO;
        }
        return null;
    }


    
}
