package com.igorromero.webfluxdemo.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.igorromero.webfluxdemo.dto.Response;

@Service
public class MathService {

    public Response findSquare(int input) {
        return new Response(input * input);
    }

    public List<Response> multiplicationTable(int input) {
        return IntStream.rangeClosed(0, 10)
            .peek(i -> new SleepUtil(1))
            .peek(i -> System.out.println("math-service processing: " + i))
            .mapToObj(i -> new Response(i * input))
            .peek(i -> System.out.println("Response: " + i))
            .collect(Collectors.toList());
    }

}
