package com.igorromero.webfluxdemo.entity;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SlackChannel {

    private String channelName;
    private String channelId;
}
