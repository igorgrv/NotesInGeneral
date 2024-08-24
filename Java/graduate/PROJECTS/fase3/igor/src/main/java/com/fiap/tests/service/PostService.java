package com.fiap.tests.service;

import java.util.UUID;

import javax.naming.NameNotFoundException;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.fiap.tests.entity.Post;
import com.fiap.tests.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
  
  private final PostRepository postRepository;

  public Post savePost(Post post) {
    return postRepository.save(post);
  }

  public Post findPostById(UUID uuid) {
    return postRepository.findById(uuid).orElseThrow(() -> new RuntimeException("UUID not found"));
  }

  public Post updatePostMessage(UUID uuid, String message) {
    Post post = findPostById(uuid);
    post.setMessage(message);
    return postRepository.save(post);
  }
}
