package com.toychain.toychain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class BlockGenerationException extends Exception {
    public BlockGenerationException() {
        super("Block Generation Failed");
    }
}
