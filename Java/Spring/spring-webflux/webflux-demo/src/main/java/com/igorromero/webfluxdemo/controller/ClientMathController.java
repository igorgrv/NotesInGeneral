package com.igorromero.webfluxdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igorromero.webfluxdemo.dto.Response;
import com.igorromero.webfluxdemo.service.ClientMathService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/client")
public class ClientMathController {

    @Autowired
    private ClientMathService clientMathService;

    @GetMapping("/square/{input}")
    public Mono<Response> getSquareClient(@PathVariable int input) {
        return clientMathService.getSquare(input);
    }

    @GetMapping("/multiplication-table/{input}")
    public Flux<Response> getMultiplicationTable(@PathVariable int input) {
        return clientMathService.getMultiplicationTable(input);
    }

    @GetMapping("/multiplicator")
    public Mono<Response> getMultiplicator(@RequestParam(required = true) int first,
            @RequestParam(required = true) int second) {

        return clientMathService.getMultiplicator(first, second);
    }
}
