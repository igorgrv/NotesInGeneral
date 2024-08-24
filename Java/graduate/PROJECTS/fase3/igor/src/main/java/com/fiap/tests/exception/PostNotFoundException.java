package com.fiap.tests.exception;

public class PostNotFoundException extends RuntimeException {

  public PostNotFoundException(String post) {
    super(post);
  }

}
