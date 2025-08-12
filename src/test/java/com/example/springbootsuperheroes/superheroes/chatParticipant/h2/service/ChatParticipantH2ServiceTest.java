package com.example.springbootsuperheroes.superheroes.chatParticipant.h2.service;


import com.example.springbootsuperheroes.superheroes.chatParticipant.entity.ChatParticipantEntity;
import com.example.springbootsuperheroes.superheroes.chatParticipant.repository.ChatParticipantRepository;
import com.example.springbootsuperheroes.superheroes.chatParticipant.service.ChatParticipantService;
import com.example.springbootsuperheroes.superheroes.exception.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
public class ChatParticipantH2ServiceTest {
    @Autowired
    private ChatParticipantRepository repo;
    private ChatParticipantService service;

    ChatParticipantEntity chatParticipant = new ChatParticipantEntity();

    @BeforeEach
    public void setup() {
        chatParticipant.setSpeaker("Eddie Brock");
        chatParticipant.setTalkContent("I am talking");

        service = new ChatParticipantService(repo);

    }
    @Test
    public void shouldFindAllChatParticipant() {
        service.addChatParticipant(chatParticipant);

        Iterable<ChatParticipantEntity> chatParticipantList = service.findAllChatParticipants();
        ChatParticipantEntity savedChatParticipant = chatParticipantList.iterator().next();

        assertThat(savedChatParticipant).isNotNull();
    }
    @Test
    public void shouldAddChatParticipant() {

        service.addChatParticipant(chatParticipant);

        Iterable<ChatParticipantEntity> chatParticipantList = service.findAllChatParticipants();
        ChatParticipantEntity savedChatParticipant = chatParticipantList.iterator().next();

        assertThat(chatParticipant).isEqualTo(savedChatParticipant);

    }

    @Test
    public void shouldUpdateChatParticipant() {
        ChatParticipantEntity savedChatParticipant  = service.addChatParticipant(chatParticipant);
        savedChatParticipant.setTalkContent("I am talking 2");

        service.updateChatParticipant(savedChatParticipant.getId(), savedChatParticipant);
        ChatParticipantEntity foundAntiHero = service.findChatParticipantById(savedChatParticipant.getId());

        assertThat(foundAntiHero.getTalkContent()).isEqualTo("I am talking 2");
    }

    @Test
    public void shouldDeleteChatParticipant() {
        assertThrows(NotFoundException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                ChatParticipantEntity savedChatParticipant  = service.addChatParticipant(chatParticipant);

                service.removeChatParticipantById(savedChatParticipant.getId());
                ChatParticipantEntity foundChatParticipant = service.findChatParticipantById(savedChatParticipant.getId());

                assertThat(foundChatParticipant).isNull();
            }
        });
    }

    @Test
    public void shouldFindChatParticipantById() {
        ChatParticipantEntity savedChatParticipant  = service.addChatParticipant(chatParticipant);

        ChatParticipantEntity foundChatParticipant = service.findChatParticipantById(savedChatParticipant.getId());
        assertThat(foundChatParticipant).isNotNull();

    }

    @Test
    public void shouldNotFindChatParticipantById() {
        assertThrows(NotFoundException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                ChatParticipantEntity foundChatParticipant = service.findChatParticipantById(UUID.randomUUID());
                assertThat(foundChatParticipant).isNull();
            }
        });

    }



}
