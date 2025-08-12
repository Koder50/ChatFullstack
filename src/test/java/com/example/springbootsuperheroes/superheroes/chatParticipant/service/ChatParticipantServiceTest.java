package com.example.springbootsuperheroes.superheroes.chatParticipant.service;

import com.example.springbootsuperheroes.superheroes.chatParticipant.repository.ChatParticipantRepository;
import com.example.springbootsuperheroes.superheroes.chatParticipant.entity.ChatParticipantEntity;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ChatParticipantServiceTest {

    @Mock
    private ChatParticipantRepository chatParticipantRepository;

    @InjectMocks
    private ChatParticipantService underTest;


    @Test
    void canFindAllChatParticipants() {
        // when
        underTest.findAllChatParticipants();
        // then
        verify(chatParticipantRepository).findAll();
    }

    @Test
    void canAddChatParticipant() {
        // given
        ChatParticipantEntity chatParticipant = new ChatParticipantEntity(
                UUID.randomUUID(),
                "Bunao Lakandula Tondo",
                "Talk of Tondo",
                new SimpleDateFormat("dd-MM-yyyy HH:mm:ss z").format(new Date()),
                "student@mail.com"
        );

        // when
        underTest.addChatParticipant(chatParticipant);

        // then
        ArgumentCaptor<ChatParticipantEntity> chatParticipantDtoArgumentCaptor = ArgumentCaptor.forClass(
                ChatParticipantEntity.class
        );
        verify(chatParticipantRepository).save(chatParticipantDtoArgumentCaptor.capture());
        ChatParticipantEntity capturedChatParticipant = chatParticipantDtoArgumentCaptor.getValue();

        assertThat(capturedChatParticipant).isEqualTo(chatParticipant);
    }
}