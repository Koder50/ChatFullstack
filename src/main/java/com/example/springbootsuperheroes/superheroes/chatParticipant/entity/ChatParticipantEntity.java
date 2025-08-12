package com.example.springbootsuperheroes.superheroes.chatParticipant.entity;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class ChatParticipantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @Column(nullable = false, updatable = false)
    private UUID id;

    @NotNull(message = "Speaker is required")
    private String speaker;

    @NotNull(message = "Content is required")
    @Column(name = "talkContent", columnDefinition = "VARCHAR(3000)", nullable = false)
    private String talkContent;
    private String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z")
            .format(new Date());
    private String chatWith;
}
