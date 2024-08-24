package com.fiap.tests.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.tests.entity.Post;
import com.fiap.tests.exception.PostNotFoundException;
import com.fiap.tests.service.PostService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @PostMapping(
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Post> registrarPost(@Valid @RequestBody Post post) {
    log.info("requisição para registrar post foi efetuada");
    var postCriada = postService.savePost(post);
    return new ResponseEntity<>(postCriada, HttpStatus.CREATED);
  }

  @GetMapping(
      value = "/{id}",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> buscarPost(@PathVariable String id) {
    log.info("requisição para buscar post foi efetuada");
    try {
      var uuid = UUID.fromString(id);
      var postEncontrada = postService.findPostById(uuid);
      return new ResponseEntity<>(postEncontrada, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body("ID inválido");
    } catch (PostNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

@GetMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<Page<Post>> listarMensagens(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {
  Pageable pageable = PageRequest.of(page, size);
  log.info("requisição para listar posts foi efetuada: Página={}, Tamanho={}", page, size);
  Page<Post> posts = postService.listarMensagens(pageable);
  return new ResponseEntity<>(posts, HttpStatus.OK);
}

@PutMapping(
    value = "/{id}",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> atualizarPost(
    @PathVariable String id,
    @RequestBody @Valid Post post) {
  log.info("requisição para atualizar post foi efetuada");
  try {
    var uuid = UUID.fromString(id);
    var postAtualizada = postService.updatePostMessage(uuid, post);
    return new ResponseEntity<>(postAtualizada, HttpStatus.OK);
  } catch (IllegalArgumentException e) {
    return ResponseEntity.badRequest().body("ID inválido");
  } catch (PostNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
  }
}

@PutMapping("/{id}/gostei")
public ResponseEntity<?> incrementarGostei(@PathVariable String id) {
  log.info("requisição para incrementar gostei foi efetuada");
  try {
    var uuid = UUID.fromString(id);
    var postAtualizada = postService.incrementarGostei(uuid);
    return new ResponseEntity<>(postAtualizada, HttpStatus.OK);
  } catch (IllegalArgumentException e) {
    return ResponseEntity.badRequest().body("ID inválido");
  } catch (PostNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
  }
}

@DeleteMapping("/{id}")
public ResponseEntity<?> apagarPost(@PathVariable String id) {
  log.info("requisição para apagar post foi efetuada");
  try {
    var uuid = UUID.fromString(id);
    postService.apagarPost(uuid);
    return new ResponseEntity<>("post removida", HttpStatus.OK);
  } catch (IllegalArgumentException e) {
    return ResponseEntity.badRequest().body("ID inválido");
  } catch (PostNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
  }
}
}
