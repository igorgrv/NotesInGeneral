package com.fiap.tests.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.tests.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID>{
  
}
