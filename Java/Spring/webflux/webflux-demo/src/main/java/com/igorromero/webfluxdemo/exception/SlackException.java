package com.igorromero.webfluxdemo.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public class SlackException extends RuntimeException {

    @Getter
    final HttpStatus status;
  
    public SlackException(String message, HttpStatus status) {
      super(message);
      this.status = status;
    }
  }