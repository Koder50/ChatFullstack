package com.example.springbootsuperheroes.superheroes.chatParticipant.repository;

import com.example.springbootsuperheroes.superheroes.chatParticipant.entity.ChatParticipantEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.UUID;

public interface ChatParticipantRepository extends CrudRepository<ChatParticipantEntity, UUID> {
}
