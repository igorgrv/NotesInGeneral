package com.igorromero.webfluxdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igorromero.webfluxdemo.dto.MultiplicatorDto;
import com.igorromero.webfluxdemo.dto.Response;
import com.igorromero.webfluxdemo.service.MathService;
import com.igorromero.webfluxdemo.service.ReactiveMathService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/math")
public class MathController {

    @Autowired
    private MathService mathService;

    @Autowired
    private ReactiveMathService reactivMathService;
    
    @GetMapping("/square/{input}")
    public Response getSquare(@PathVariable int input) {
        return mathService.findSquare(input);
    }

    @GetMapping("/multiplication-table/{input}")
    public List<Response> getMultiplicationTable(@PathVariable int input) {
        return mathService.multiplicationTable(input);
    }

    @GetMapping("/reactive/square/{input}")
    public Mono<Response> getSquareReactive(@PathVariable int input) {
        return reactivMathService.getSquare(input);
    }

    @GetMapping(value = "/reactive/multiplication-table/{input}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Response> getMultiplicationTablReactive(@PathVariable int input) {
        return reactivMathService.multiplicationTable(input);
    }

    @PostMapping("/reactive/multiply")
    public Mono<Response> multiplyValues(@RequestBody Mono<MultiplicatorDto> multiplicatorDto) {
        return reactivMathService.getMultiplicatorResult(multiplicatorDto);
    }
}
