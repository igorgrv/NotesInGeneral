package com.fiap.tests.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
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

class PostRepositoryTest {

  @Mock
  private PostRepository postRepository;

  AutoCloseable openMocks;

  @BeforeEach
  void setUp() {
    openMocks = MockitoAnnotations.openMocks(this);
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
  void mustSavePosts() {
    Post posts = generatePosts();

    when(postRepository.save(any(Post.class))).thenReturn(posts);
    Post savedPosts = postRepository.save(posts);

    assertThat(savedPosts)
        .isInstanceOf(Post.class)
        .isNotNull()
        .isEqualTo(posts);
    verify(postRepository, times(1)).save(any(Post.class));
  }

  @Test
  void mustFindPosts() {
    UUID id = UUID.randomUUID();
    Post posts = generatePosts();
    posts.setUuid(id);

    when(postRepository.findById(id)).thenReturn(Optional.of(posts));

    Optional<Post> postsOptional = postRepository.findById(id);

    verify(postRepository, times(1)).findById(id);
    assertThat(postsOptional).isPresent().containsSame(posts);
    postsOptional.ifPresent(savedPosts -> {
      assertThat(savedPosts.getUuid()).isEqualTo(id);
      assertThat(savedPosts.getMessage()).isEqualTo(posts.getMessage());
    });

  }

  @Test
  void mustDeletePosts() {
    UUID id = UUID.randomUUID();
    doNothing().when(postRepository).deleteById(id);
    // Act
    postRepository.deleteById(id);
    // Assert
    verify(postRepository, times(1)).deleteById(id);
  }

}
