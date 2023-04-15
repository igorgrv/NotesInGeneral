package com.igor.corsandcsrf.controller;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notices")
public class MyAccountController {

  // etMapping
  // public String toString() {
  // return "myAccount blocked";
  // }

  @GetMapping
  public ResponseEntity<List<String>> getNotices() {
    List<String> notices = Arrays.asList("test", "test2");
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
        .body(notices);
  }
}
