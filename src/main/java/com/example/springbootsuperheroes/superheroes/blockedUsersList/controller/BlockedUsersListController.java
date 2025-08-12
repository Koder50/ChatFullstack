package com.example.springbootsuperheroes.superheroes.blockedUsersList.controller;

import com.example.springbootsuperheroes.superheroes.blockedUsersList.dto.BlockedUsersListDto;
import com.example.springbootsuperheroes.superheroes.blockedUsersList.entity.BlockedUsersListEntity;
import com.example.springbootsuperheroes.superheroes.blockedUsersList.service.BlockedUsersListService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/blocked-users-lists")
@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "bearerAuth")
public class BlockedUsersListController {
    private final BlockedUsersListService service;
    private final ModelMapper mapper;
    // LOGGER FROM SLF4j
    private static final Logger LOGGER = LoggerFactory.getLogger(BlockedUsersListController.class);

    // LOGGER FROM LOMBOK SLF4j
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<BlockedUsersListDto> getBlockedUsersLists(Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();
        //SLF4J
        LOGGER.info("Using SLF4J: Getting BlockedUsersList list - getBlockedUsersLists()");
        //LOMBOK SLF4j
        log.info("Using SLF4J Lombok: Getting BlockedUsersList list - getBlockedUsersLists()");
        // Mapstruct is another dto mapper, but it's not straight forward
        var blockedUsersListList = StreamSupport
                .stream(service.findAllBlockedUsersLists().spliterator(), false)
                .skip(toSkip).limit(pageable.getPageSize())
                .collect(Collectors.toList());

        return blockedUsersListList
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BlockedUsersListDto getBlockedUsersList(@PathVariable("id") UUID id) {
        return convertToDto(service.findBlockedUsersListById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteBlockedUsersList(@PathVariable("id") UUID id) {
        service.removeBlockedUsersListById(id);
    }

    @PostMapping
    public BlockedUsersListDto addBlockedUsersList(@Valid @RequestBody BlockedUsersListDto blockedUsersListDto) {
        var entity = convertToEntity(blockedUsersListDto);
        var blockedUsersList = service.addBlockedUsersList(entity);

        return convertToDto(blockedUsersList);
    }

    @PutMapping("/{id}")
    public void updateBlockedUsersList(
            @PathVariable("id") UUID id,
            @Valid @RequestBody BlockedUsersListDto blockedUsersListDto
    ) {
        if (!id.equals(blockedUsersListDto.getId())) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "id does not match"
        );

        var blockedUsersListEntity = convertToEntity(blockedUsersListDto);
        service.updateBlockedUsersList(id, blockedUsersListEntity);
    }

    private BlockedUsersListDto convertToDto(BlockedUsersListEntity entity) {
        return mapper.map(entity, BlockedUsersListDto.class);
    }

    private BlockedUsersListEntity convertToEntity(BlockedUsersListDto dto) {
        return mapper.map(dto, BlockedUsersListEntity.class);
    }

}
