package com.igorromero.webfluxdemo.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MultiplicatorDto {
    
    private int firstValue;
    private int secondValue;
    
    public MultiplicatorDto(int first, int second) {
        this.firstValue = first;
        this.secondValue = second;
    }
}
