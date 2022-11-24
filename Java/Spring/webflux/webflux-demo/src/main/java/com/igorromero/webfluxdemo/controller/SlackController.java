package com.igorromero.webfluxdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igorromero.webfluxdemo.dto.SlackChatRequestDto;
import com.igorromero.webfluxdemo.service.SlackService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/slack")
public class SlackController {

    @Autowired
    private SlackService slackService;

    @PostMapping("/chat")
    public Mono<Object> postSlackMessage(@RequestHeader(required = true) String authorization,
            @RequestBody SlackChatRequestDto slackChatDto) {
        return slackService.getChannelList(slackChatDto, authorization);
    }

    @GetMapping("/channel")
    public Mono<String> getChannelInfo(@RequestParam (required = true) String token, @RequestParam (required = true) String channel) {
        return slackService.getChannelInfo(token, channel);
    }
}
