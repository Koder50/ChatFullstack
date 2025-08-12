package com.example.springbootsuperheroes.superheroes.blockedUsersList.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class BlockedUsersListDto {

    private UUID id;

    @NotNull(message = "Email is required")
    private String userEmail;
    private String[] blockedUsersList;
}
