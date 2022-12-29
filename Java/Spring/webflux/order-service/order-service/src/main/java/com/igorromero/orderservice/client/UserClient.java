package com.igorromero.orderservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

import com.igorromero.orderservice.dto.request.TransactionRequestDto;

import reactor.core.publisher.Mono;

public class UserClient {

    private final WebClient webClient;

    public UserClient(@Value("${user.service.url}") String url) {
        this.webClient = WebClient.builder().baseUrl(url).build();
    }

    public Mono<TransactionRequestDto> authorizeTransaction(TransactionRequestDto requestDto) {
        return this.webClient.post().uri("transaction").bodyValue(requestDto).retrieve()
                .bodyToMono(TransactionRequestDto.class);
    }

}
