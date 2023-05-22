package com.igorromero.webfluxdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.igorromero.webfluxdemo.service.NHubService;

import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/nhub")
public class NHubController {

    @Autowired
    private NHubService nhubService;

    @GetMapping("/heathcheck")
    public Flux<Object> getHealthChecks() {
        return nhubService.getHealthChecks();
    }

    @GetMapping("/heathcheck/webclient")
    public Mono<String> getHealthChecksWebClient() {
        return nhubService.getHealthChecksWebClient();
    }
}
