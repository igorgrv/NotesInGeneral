package com.igorromero.webfluxdemo.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TestScheduler {

	private final WebClient webClient;

	@Scheduled(cron = "1 * * * * ?")
	public String getHealthChecksWebClient() {
		log.info("updateSlackChannelList - START");
		String endpoint = "/check/all";
		return webClient.get()
				.uri(endpoint)
				.retrieve()
				.bodyToMono(String.class)
				.block();
	}

}
