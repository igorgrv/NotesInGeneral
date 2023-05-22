package com.igorromero.webfluxdemo.exception;

public class InputValidationException extends RuntimeException {

    private static final String MSG = "Error Message Default";
    private static final int errorCode = 100;
    private final int input;

    public InputValidationException(int input) {
        super(MSG);
        this.input = input;
    }

    public int getErrorcode() {
        return errorCode;
    }

    public int getInput() {
        return input;
    }

}
