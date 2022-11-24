package com.igorromero.webfluxdemo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import com.igorromero.webfluxdemo.dto.InputValidationFailedResponse;
import com.igorromero.webfluxdemo.exception.InputValidationException;

import reactor.core.publisher.Flux;

@Service
public class NHubService {

    public Flux<Object> getHealthChecks() {
        return webClient()
                .get()
                .uri("/check/all")
                .headers(h -> h.setBasicAuth("nhubb", "PjjiWgOtF6tuA5q4l0IB"))
                .headers(h -> h.set("Token-Authorization",
                        "a eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPREV6WkdRek1qUXRNbUl6TkMwMCIsImxhc3ROYW1lIjoiUm9tZXJvJTIwVmlsZWxhIiwidWlkIjoiMDAzNDA3NjMxIiwiZmlyc3ROYW1lIjoiSWdvciIsImVtYWlsQWRkcmVzcyI6Imlnb3Iucm9tZXJvQGlibS5jb20iLCJpc3MiOiJodHRwczovL25odWIuaWJtLmNvbSIsImRuIjoidWlkPTAwMzQwNzYzMSxjPWJyLG91PWJsdWVwYWdlcyxvPWlibS5jb20iLCJjbiI6Iklnb3IlMjBSb21lcm8lMjBWaWxlbGEiLCJleHAiOjE2MTE3NTY2NTMsImlhdCI6MTYxMTc0OTQ1M30.DQMj5trG9WVqWtmLpPxkB3DGKppeJ9NYaHRVVeIDG0LX8F-57Ynrg2MZ780h7N3pmcVUOxSUKQKl8YA871PpLBSZy1xGUetoLyO23oQH78463ih53SpplTUMXN-9XrA2lngGVRgVzxzZSS1Nop1NkPKirnKf4LCT4VsRBbfTIvk"))
                .exchangeToFlux(this::exchange);
    }

    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://nhub-bk-dev.dal1a.ciocloud.nonprod.intranet.ibm.com/ibm-notification-hub").build();
    }

    public Flux<Object> exchange(ClientResponse cr) {
        if (cr.rawStatusCode() != 200)
            return cr.bodyToFlux(Exception.class);
        return cr.bodyToFlux(String.class);
    }

}
