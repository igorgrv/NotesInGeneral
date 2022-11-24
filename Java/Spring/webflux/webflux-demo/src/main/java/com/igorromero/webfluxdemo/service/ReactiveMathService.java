package com.igorromero.webfluxdemo.service;

import java.time.Duration;

import org.springframework.stereotype.Service;

import com.igorromero.webfluxdemo.dto.MultiplicatorDto;
import com.igorromero.webfluxdemo.dto.Response;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ReactiveMathService {

    public Mono<Response> getSquare(int input) {
        return Mono.fromSupplier(() -> input * input)
                .map(Response::new);
    }

    public Flux<Response> multiplicationTable(int input) {
        return Flux.range(1, 10)
                .delayElements(Duration.ofSeconds(1))
                .map(i -> new Response(i * input))
                .doOnNext(i -> System.out.println("math-service processing: " + i));
    }

    public Mono<Response> getMultiplicatorResult(Mono<MultiplicatorDto> multiplicatorDto) {
        return multiplicatorDto
            .map(dto -> new Response(dto.getFirstValue() * dto.getSecondValue()));
    }
}
