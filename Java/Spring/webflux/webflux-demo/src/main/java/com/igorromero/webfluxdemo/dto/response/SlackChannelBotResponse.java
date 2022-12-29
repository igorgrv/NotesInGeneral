package com.igorromero.webfluxdemo.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SlackChannelBotResponse {

    private Boolean ok;

    private String test;

    private JsonNode channels;

    @JsonProperty("response_metadata")
    private JsonNode responseMetadata;

}
