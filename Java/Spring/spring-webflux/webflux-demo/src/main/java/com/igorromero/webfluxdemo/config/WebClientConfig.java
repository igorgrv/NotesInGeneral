package com.igorromero.webfluxdemo.config;

import java.util.Base64;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    // @Value("${nhub.baseurl}")
    private String baseURL = "http://localhost:9080/ibm-notification-hub";

    // @Value("${nhub.security.user.name}")
    private String username = "nhub";

    // @Value("${nhub.security.user.password}")
    private String password = "@nhub123";

    @Bean
    public WebClient webClient() {
        final int size = 16 * 1024 * 1024;
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();

        return WebClient.builder()
                .exchangeStrategies(strategies)
                .baseUrl(baseURL)
                .defaultHeaders(httpHeaders -> httpHeaders.add("Authorization",
                        getBasicAuthenticationHeader(username, password)))
                .build();
    }

    private String getBasicAuthenticationHeader(String username, String password) {
        String valueToEncode = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(valueToEncode.getBytes());
    }
}
