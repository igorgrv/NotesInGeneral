package com.example.demo.service;

import com.example.demo.entity.Item;

import org.springframework.stereotype.Component;

@Component
public class HelloWorldService {

  public Item retrieveItem() {
    return new Item(1, "Ball", 10, 100);
  }
  
}
