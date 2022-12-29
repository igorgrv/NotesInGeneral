package com.igorromero.orderservice.dto.response;

import com.igorromero.orderservice.dto.TransactionStatus;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TransactionResponseDto {

    private Integer userId;
    private Integer amount;
    private TransactionStatus status;

}
