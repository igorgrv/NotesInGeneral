package com.igorromero.webfluxdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igorromero.webfluxdemo.service.NHubService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/nhub")
public class NHubController {
    

    @Autowired
    private NHubService nhubService;

    @GetMapping("/heathcheck")
    public Flux<Object> getHealthChecks() {
        return nhubService.getHealthChecks();
    }
}
