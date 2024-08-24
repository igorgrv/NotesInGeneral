package com.fiap.tests.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import com.fiap.tests.entity.Post;

import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureTestDatabase
@Transactional
class PostRepositoryIT {

  @Autowired
  private PostRepository postRepository;

  private Post generatePosts() {
    return Post.builder()
        .uuid(UUID.randomUUID())
        .user("user 1")
        .message("posts is 123")
        .build();
  }

  private Post savePost(Post post) {
    return postRepository.save(post);
  }

  @Test
  void tableMustHaveValues() {
    long count = postRepository.count();
    assertThat(count).isNotNegative();
  }

  @Test
  void mustSavePost() {
    UUID randomUUID = UUID.randomUUID();
    Post post = generatePosts();
    post.setUuid(randomUUID);
    Post savedPost = savePost(post);

    long count = postRepository.count();
    assertThat(count).isPositive();

    assertThat(savedPost).isInstanceOf(Post.class).isNotNull();
    assertThat(savedPost.getUser()).isEqualTo("user 1");
    assertThat(savedPost.getMessage()).isEqualTo("posts is 123");
  }

  @Test
  void mustFindPost() {
    UUID randomUUID = UUID.randomUUID();
    Post postGenerated = generatePosts();
    postGenerated.setUuid(randomUUID);

    Optional<Post> postOpt = postRepository.findById(randomUUID);

    assertThat(postOpt).isPresent();

    postOpt.ifPresent(post -> {
      assertThat(post.getUuid()).isEqualTo(randomUUID);
      assertThat(post).isInstanceOf(Post.class).isNotNull();
      assertThat(post.getUser()).isEqualTo("user 1");
      assertThat(post.getMessage()).isEqualTo("posts is 123");
    });
  }
}
