package com.igorromero.webfluxdemo.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.igorromero.webfluxdemo.dto.request.SlackChatRequestDto;
import com.igorromero.webfluxdemo.dto.response.SlackChannelBotResponse;
import com.igorromero.webfluxdemo.dto.response.SlackChatResponseDto;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SlackClient {

    private final WebClient webClient;

    String url = "https://slack.com/api";

    public SlackClient() {
        final int size = 16 * 1024 * 1024;
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();

        this.webClient = WebClient.builder()
                .exchangeStrategies(strategies).baseUrl(url).build();
    }

    public SlackChannelBotResponse requestChannelsGivenBot(String token, String cursor, String types) {
        return this.webClient
                .post()
                .uri(u -> u.path("/conversations.list").query("token={token}&cursor={cursor}&types={types}&limit=1000")
                        .build(token, cursor, types))
                .retrieve()
                .onStatus(httpStatus -> !httpStatus.is2xxSuccessful(), error -> Mono.error(new Exception()))
                .bodyToMono(SlackChannelBotResponse.class)
                .block();
    }

    public Mono<SlackChatResponseDto> postSlackMessage(SlackChatRequestDto slackChatDto, String authorization) {
        return this.webClient
                .post()
                .uri("/chat.postMessage")
                .bodyValue(slackChatDto)
                .headers(h -> h.set("Authorization", authorization))
                .exchangeToMono(this::exchange);
    }

    private Mono<SlackChatResponseDto> exchange(ClientResponse cr) {
        if (cr.rawStatusCode() != 200) {
            System.out.println("Error HTTP: " + cr.rawStatusCode());
            return cr.bodyToMono(SlackChatResponseDto.class);
        }
        return cr.bodyToMono(SlackChatResponseDto.class);

    }

    public Mono<SlackChatResponseDto> getChannelInfo(String token, String channel) {
        return this.webClient
                .get()
                .uri(b -> b.path("/conversations.info")
                        .query("token={token}&channel={channel}")
                        .build(token, channel))
                .retrieve()
                .bodyToMono(SlackChatResponseDto.class);
    }

}
