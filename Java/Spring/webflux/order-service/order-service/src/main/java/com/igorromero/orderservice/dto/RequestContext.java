package com.igorromero.orderservice.dto;

import com.igorromero.orderservice.dto.request.PurchaseOrderRequestDto;
import com.igorromero.orderservice.dto.request.TransactionRequestDto;
import com.igorromero.orderservice.dto.response.TransactionResponseDto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RequestContext {
    
    private PurchaseOrderRequestDto purchaseOrderRequestDto;
    private ProductDto productDto;
    private TransactionRequestDto transactionRequestDto;
    private TransactionResponseDto transactionResponseDto;

    public RequestContext (PurchaseOrderRequestDto purchaseOrderRequestDto) {
        this.purchaseOrderRequestDto = purchaseOrderRequestDto;
    }

}
