package com.igorromero.webfluxdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.igorromero.webfluxdemo.dto.MultiplicatorDto;
import com.igorromero.webfluxdemo.dto.Response;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ClientMathService {

    @Autowired
    private WebClient webClient;

    public Mono<Response> getSquare(int input) {
        return webClient.get().uri("math/reactive/square/{input}", input).retrieve().bodyToMono(Response.class);
    }

    public Flux<Response> getMultiplicationTable(int input) {
        return webClient.get().uri("math/reactive/multiplication-table/{input}", input)
                .retrieve()
                .bodyToFlux(Response.class)
                .doOnNext(i -> System.out.println(i));
    }

    public Mono<Response> getMultiplicator(int first, int second) {
        return webClient
                .post()
                .uri("math/reactive/multiply")
                .bodyValue(new MultiplicatorDto(first, second))
                .retrieve()
                .bodyToMono(Response.class);
    }
}
