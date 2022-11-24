package com.igorromero.webfluxdemo.exceptionHandler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.igorromero.webfluxdemo.dto.InputValidationFailedResponse;
import com.igorromero.webfluxdemo.exception.InputValidationException;

@ControllerAdvice
public class InputValidationHandler {

    @ExceptionHandler(InputValidationException.class)
    public ResponseEntity<InputValidationFailedResponse> handleException(InputValidationException ex) {
        InputValidationFailedResponse response = new InputValidationFailedResponse();
        response.setErrorCode(ex.getErrorcode());
        response.setMessage(ex.getMessage());
        response.setInput(ex.getInput());
        return ResponseEntity.badRequest().body(response);
    }
}
