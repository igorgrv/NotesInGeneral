package com.example.demo.controller;

import com.example.demo.entity.Item;
import com.example.demo.service.HelloWorldService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

  @Autowired
  private HelloWorldService helloWorldService;

  @GetMapping("/")
  public String helloworld() {
    return "HelloWorld";
  }

  @GetMapping("/dummy-item")
  public Item dummyItem() {
    return new Item(1, "Ball", 10, 100);
  }

  @GetMapping("/dummy-item-service")
  public Item dummyItemService() {
    return helloWorldService.retrieveItem();
  }
}
