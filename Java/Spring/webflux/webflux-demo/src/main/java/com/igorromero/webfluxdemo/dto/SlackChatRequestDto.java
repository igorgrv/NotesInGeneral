package com.igorromero.webfluxdemo.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SlackChatRequestDto {
    
    private boolean asUser;
    private String channel;
    private String text;
}
