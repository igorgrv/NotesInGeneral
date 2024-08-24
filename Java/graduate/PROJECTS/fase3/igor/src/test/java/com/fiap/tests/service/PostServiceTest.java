package com.fiap.tests.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.fiap.tests.entity.Post;
import com.fiap.tests.repository.PostRepository;

class PostServiceTest {

  private PostService postService;

  @Mock
  private PostRepository postRepository;
  AutoCloseable openMocks;

  @BeforeEach
  void setup() {
    openMocks = MockitoAnnotations.openMocks(this);
    postService = new PostService(postRepository);
  }

  @AfterEach
  void tearDown() throws Exception {
    openMocks.close();
  }

  private Post generatePosts() {
    return Post.builder()
        .uuid(UUID.randomUUID())
        .user("user 1")
        .message("posts is 123")
        .build();
  }

  @Test
  void mustSavePost() {
    Post postCreated = generatePosts();

    when(postRepository.save(any(Post.class))).thenReturn(postCreated);

    Post savedPost = postService.savePost(postCreated);
    assertThat(savedPost).isInstanceOf(Post.class).isNotNull();
    assertThat(savedPost.getMessage()).isEqualTo("posts is 123");
  }

  @Test
  void mustFindPost() {
    UUID id = UUID.randomUUID();
    Post post = generatePosts();
    post.setUuid(id);

    when(postRepository.findById(id)).thenReturn(Optional.of(post));
    Post postFound = postService.findPostById(id);

    assertThat(postFound).isInstanceOf(Post.class).isNotNull().isEqualTo(post);
    assertThat(postFound.getMessage()).isEqualTo("posts is 123");
    verify(postRepository, times(1)).findById(any(UUID.class));
  }

  @Test
  void mustThrowExceptionIfPostIsNotFound() {

    when(postRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.findPostById(UUID.randomUUID()))
      .isInstanceOf(RuntimeException.class)
      .hasMessageContaining("UUID not found");
    
    verify(postRepository, times(1)).findById(any(UUID.class));
  }

  @Test
  void mustUpdatePostMessage() {
    UUID uuid = UUID.randomUUID();
    String newMessage = "message updated";
    Post oldPost = generatePosts();
    oldPost.setUuid(uuid);

    when(postRepository.findById(uuid)).thenReturn(Optional.of(oldPost));
    when(postRepository.save(any(Post.class))).thenAnswer(i -> i.getArgument(0));

    Post postUpdated = postService.updatePostMessage(uuid, newMessage);
    assertThat(postUpdated).isInstanceOf(Post.class).isNotNull();
    assertThat(postUpdated.getMessage()).isEqualTo(newMessage);
    verify(postRepository, times(1)).findById(any(UUID.class));
    verify(postRepository, times(1)).save(any(Post.class));
  }

  @Test
  void mustThrowExceptionIfIDnotFoundWhenUpdatingMessage() {
    when(postRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.updatePostMessage(UUID.randomUUID(), "test"))
      .isInstanceOf(RuntimeException.class)
      .hasMessageContaining("UUID not found");
  }

}
