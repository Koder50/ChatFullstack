package com.example.springbootsuperheroes.superheroes.blockedUsersList.service;

import com.example.springbootsuperheroes.superheroes.blockedUsersList.entity.BlockedUsersListEntity;
import com.example.springbootsuperheroes.superheroes.blockedUsersList.repository.BlockedUsersListRepository;
import com.example.springbootsuperheroes.superheroes.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@AllArgsConstructor
@Service
public class BlockedUsersListService {

    private final BlockedUsersListRepository repo;

    public Iterable<BlockedUsersListEntity> findAllBlockedUsersLists() {
        return repo.findAll();
    }

    public BlockedUsersListEntity findBlockedUsersListById(UUID id) {
        return findOrThrow(id);
    }

    public void removeBlockedUsersListById(UUID id) {
        repo.deleteById(id);
    }

    public BlockedUsersListEntity addBlockedUsersList(BlockedUsersListEntity blockedUsersList) {
        return repo.save(blockedUsersList);
    }

    public void updateBlockedUsersList(UUID id, BlockedUsersListEntity blockedUsersList) {
        findOrThrow(id);
        repo.save(blockedUsersList);
    }

    private BlockedUsersListEntity findOrThrow(final UUID id) {
        return repo
                .findById(id)
                .orElseThrow(
                        () -> new NotFoundException("Chat-participant by id " + id + " was not found")
                );
    }
}

