package com.example.springbootsuperheroes.superheroes.chatParticipant.dto;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatParticipantDto {

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
