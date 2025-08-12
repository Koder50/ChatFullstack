package com.example.springbootsuperheroes.superheroes.chatParticipant.controller;

import com.example.springbootsuperheroes.superheroes.chatParticipant.dto.ChatParticipantDto;
import com.example.springbootsuperheroes.superheroes.chatParticipant.entity.ChatParticipantEntity;
import com.example.springbootsuperheroes.superheroes.chatParticipant.service.ChatParticipantService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/chat-participants")
@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "bearerAuth")
public class ChatParticipantController {
    private final ChatParticipantService service;
    private final ModelMapper mapper;
    // LOGGER FROM SLF4j
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatParticipantController.class);

    // LOGGER FROM LOMBOK SLF4j
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<ChatParticipantDto> getChatParticipants(Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();
        //SLF4J
        LOGGER.info("Using SLF4J: Getting chat-participant list - getChatParticipants()");
        //LOMBOK SLF4j
        log.info("Using SLF4J Lombok: Getting chat participant list - getChatParticipants()");
        // Mapstruct is another dto mapper, but it's not straight forward
        var chatParticipantList = StreamSupport
                .stream(service.findAllChatParticipants().spliterator(), false)
                .skip(toSkip).limit(pageable.getPageSize())
                .collect(Collectors.toList());

        return chatParticipantList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ChatParticipantDto getAntiHeroById(@PathVariable("id") UUID id) {
        return convertToDto(service.findChatParticipantById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteChatParticipantById(@PathVariable("id") UUID id) {
        service.removeChatParticipantById(id);
    }

    @PostMapping
    public ChatParticipantDto postChatParticipant(@Valid @RequestBody ChatParticipantDto chatParticipantDto) {
        var entity = convertToEntity(chatParticipantDto);
        var chatParticipant = service.addChatParticipant(entity);

        return convertToDto(chatParticipant);
    }

    @PutMapping("/{id}")
    public void putChatParticipant(
            @PathVariable("id") UUID id,
            @Valid @RequestBody ChatParticipantDto chatParticipantDto
    ) {
        if (!id.equals(chatParticipantDto.getId())) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "id does not match"
        );

        var chatParticipantEntity = convertToEntity(chatParticipantDto);
        service.updateChatParticipant(id, chatParticipantEntity);
    }

    private ChatParticipantDto convertToDto(ChatParticipantEntity entity) {
        return mapper.map(entity, ChatParticipantDto.class);
    }

    private ChatParticipantEntity convertToEntity(ChatParticipantDto dto) {
        return mapper.map(dto, ChatParticipantEntity.class);
    }

}
