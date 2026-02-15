package com.poll.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poll.entities.Poll;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findAllByUserId(Long userId);
    List<Poll> findAllByExpiredAtAfter(Date date);
    List<Poll> findAllByUserIdAndExpiredAtAfter(Long userId, Date date);
}
