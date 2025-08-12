package com.example.springbootsuperheroes.superheroes.chatParticipant.service;

import java.util.UUID;

import com.example.springbootsuperheroes.superheroes.chatParticipant.entity.ChatParticipantEntity;
import com.example.springbootsuperheroes.superheroes.exception.NotFoundException;
import com.example.springbootsuperheroes.superheroes.chatParticipant.repository.ChatParticipantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ChatParticipantService {

    private final ChatParticipantRepository repo;

    public Iterable<ChatParticipantEntity> findAllChatParticipants() {
        return repo.findAll();
    }

    public ChatParticipantEntity findChatParticipantById(UUID id) {
        return findOrThrow(id);
    }

    public void removeChatParticipantById(UUID id) {
        repo.deleteById(id);
    }

    public ChatParticipantEntity addChatParticipant(ChatParticipantEntity chatParticipant) {
        return repo.save(chatParticipant);
    }

    public void updateChatParticipant(UUID id, ChatParticipantEntity chatParticipant) {
        findOrThrow(id);
        repo.save(chatParticipant);
    }

    private ChatParticipantEntity findOrThrow(final UUID id) {
        return repo
                .findById(id)
                .orElseThrow(
                        () -> new NotFoundException("Chat-participant by id " + id + " was not found")
                );
    }
}

