package com.igorromero.webfluxdemo;

import com.igorromero.webfluxdemo.service.MathService;

public class ForTesting {

	public static void main(String[] args) {
		MathService mathService = new MathService();
		mathService.findSquare(5);
		mathService.multiplicationTable(5);

	}

}
