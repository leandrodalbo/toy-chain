package com.toychain.toychain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidTransactionException extends Exception {
    public InvalidTransactionException() {
        super("Invalid Transaction");
    }
}
