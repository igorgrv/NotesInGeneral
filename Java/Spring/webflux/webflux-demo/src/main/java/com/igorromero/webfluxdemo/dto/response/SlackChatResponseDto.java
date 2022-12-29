package com.igorromero.webfluxdemo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class SlackChatResponseDto {
    
    private boolean ok;
    private String error;
    private String warning;
    private String channel;
    private JsonNode message;
    private JsonNode ts;

    @JsonProperty("response_metadata")
    private JsonNode responseMetadata;

}
