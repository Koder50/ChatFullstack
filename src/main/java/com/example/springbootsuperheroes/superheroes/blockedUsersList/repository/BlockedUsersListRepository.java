package com.example.springbootsuperheroes.superheroes.blockedUsersList.repository;

import com.example.springbootsuperheroes.superheroes.blockedUsersList.entity.BlockedUsersListEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface BlockedUsersListRepository extends CrudRepository<BlockedUsersListEntity, UUID> {
}
