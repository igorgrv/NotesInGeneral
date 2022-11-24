package com.igorromero.webfluxdemo.service;

import java.net.URI;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.igorromero.webfluxdemo.dto.SlackChatRequestDto;
import com.igorromero.webfluxdemo.dto.response.SlackResponseDto;

import reactor.core.publisher.Mono;

@Service
public class SlackService {

    public Mono<Object> getChannelList(SlackChatRequestDto slackChatDto, String authorization) {
        return webClient()
                .post()
                .uri("/chat.postMessage")
                .bodyValue(slackChatDto)
                .headers(h -> h.set("Authorization", authorization))
                .exchangeToMono(this::exchange).log();
    }

    public WebClient webClient() {
        return WebClient.builder().baseUrl("https://slack.com/api").build();
    }

    private Mono<Object> exchange(ClientResponse cr) {
        if (cr.rawStatusCode() != 200) {
            System.out.println("Error HTTP: " + cr.rawStatusCode());
            return cr.bodyToMono(SlackResponseDto.class);
        }
        return cr.bodyToMono(SlackResponseDto.class);

    }

    public Mono<String> getChannelInfo(String token, String channel) {
        URI uri = UriComponentsBuilder.fromUriString("/conversations.info?token={token}&channel={channel}")
                .build(token, channel);
        return webClient().get().uri(uri).retrieve().bodyToMono(String.class);
    }

}
