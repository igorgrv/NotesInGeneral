package com.igorromero.orderservice.dto.response;

import com.igorromero.orderservice.dto.OrderStatus;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class PurchaseOrderResponseDto {
    
    private Integer orderId;
    private Integer productId;
    private Integer userId;
    private Integer amount;
    private OrderStatus status;
}

    
