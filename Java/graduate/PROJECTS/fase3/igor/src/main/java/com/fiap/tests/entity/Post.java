package com.fiap.tests.entity;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post {

  @Id
  @Default
  private UUID uuid = UUID.randomUUID();

  @NotEmpty(message = "User is required")
  private String user;

  @NotEmpty(message = "message is required")
  private String message;

  @Default
  private LocalDate createdDate = LocalDate.now();

  @Default
  private int likeCount = 0;
  
}
