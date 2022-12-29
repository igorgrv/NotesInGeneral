package com.igorromero.webfluxdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igorromero.webfluxdemo.dto.request.SlackChatRequestDto;
import com.igorromero.webfluxdemo.dto.response.SlackChannelBotResponse;
import com.igorromero.webfluxdemo.dto.response.SlackChatResponseDto;
import com.igorromero.webfluxdemo.service.SlackService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/slack")
public class SlackController {

    @Autowired
    private SlackService slackService;

    @PostMapping("/chat")
    public Mono<SlackChatResponseDto> postSlackMessage(@RequestHeader(required = true) String authorization,
            @RequestBody SlackChatRequestDto requestDto) {
        return slackService.postSlackMessage(requestDto, authorization);
    }

    @GetMapping("/channel")
    public Mono<SlackChatResponseDto> getChannelInfo(@RequestParam (required = true) String token, @RequestParam (required = true) String channel) {
        return slackService.getChannelInfo(token, channel);
    }

    @PostMapping("/channel/update")
    public String updateSlackChannels() {
        return slackService.updateSlackChannels();
    }
}
