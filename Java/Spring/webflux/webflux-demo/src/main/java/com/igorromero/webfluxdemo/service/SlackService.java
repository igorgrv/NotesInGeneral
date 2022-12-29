package com.igorromero.webfluxdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igorromero.webfluxdemo.client.SlackClient;
import com.igorromero.webfluxdemo.dto.request.SlackChatRequestDto;
import com.igorromero.webfluxdemo.dto.response.SlackChannelBotResponse;
import com.igorromero.webfluxdemo.dto.response.SlackChatResponseDto;
import com.igorromero.webfluxdemo.entity.SlackChannel;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SlackService {

    @Autowired
    private SlackClient slackClient;

    // @Value("${slack.bot.token}")
    String token = "public_channel";

    // @Value("${slack.bot.types}")
    String types = "public_channel";

    public Mono<SlackChatResponseDto> postSlackMessage(SlackChatRequestDto requestDto, String authorization) {
        return slackClient.postSlackMessage(requestDto, authorization);
    }

    public Mono<SlackChatResponseDto> getChannelInfo(String token, String channel) {
        return slackClient.getChannelInfo(token, channel);
    }

    public String updateSlackChannels() {
        String cursor = "";
        int cursorInteractions = 0;
        long startCursors = System.nanoTime();
        List<SlackChannel> channelList = new ArrayList<>();
        log.info("SLACK - UPDATE CHANNELS - START");

        do {
            long startCursor = System.nanoTime();
            SlackChannelBotResponse response = slackClient.requestChannelsGivenBot(token, cursor, types);
            cursor = response.getResponseMetadata().get("next_cursor").toString();
            cursorInteractions++;
            log.info("SLACK - UPDATE CHANNELS - elapsedTime: {}s - Cursor {}: {}",
                    TimeUnit.SECONDS.convert(System.nanoTime() - startCursor, TimeUnit.NANOSECONDS), cursorInteractions,
                    cursor);

            if (response.getChannels().isEmpty())
                continue;

            response.getChannels().forEach(channel -> {
                SlackChannel slackChannel = new SlackChannel();
                slackChannel.setChannelName(channel.get("name").toString());
                slackChannel.setChannelId(channel.get("id").toString());

                boolean isArchived = channel.get("is_archived").booleanValue();
                // avoid adding duplicated channels
                if (!channelList.contains(slackChannel) && !isArchived)
                    channelList.add(slackChannel);
            });
        } while (!cursor.isEmpty());

        log.info(
                "SLACK - UPDATE CHANNELS - Finish getting channels - Channels found: {} - Cursor interactions: {} - elapsedTime: {}s",
                channelList.size(), cursorInteractions,
                TimeUnit.SECONDS.convert(System.nanoTime() - startCursors, TimeUnit.NANOSECONDS));

        return "Updating Channels asynch";
    }
}
