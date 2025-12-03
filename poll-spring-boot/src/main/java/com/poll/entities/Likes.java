package com.poll.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.poll.dtos.LikesDTO;

import lombok.Data;

@Entity
@Data
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "poll_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Poll poll;

    public LikesDTO getLikesDTO() {
        LikesDTO likesDTO = new LikesDTO();
        likesDTO.setId(id);
        likesDTO.setUserId(user.getId());
        likesDTO.setPollId(poll.getId());
        likesDTO.setUsername(user.getFirstName() + " " + user.getLastName());
        return likesDTO;
    }
}
