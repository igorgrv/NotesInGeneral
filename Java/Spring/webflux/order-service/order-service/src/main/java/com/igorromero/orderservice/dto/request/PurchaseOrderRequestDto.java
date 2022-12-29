package com.igorromero.orderservice.dto.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class PurchaseOrderRequestDto {
    
    private Integer productId;
    private Integer userId;
}
