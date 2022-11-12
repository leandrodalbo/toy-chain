package com.toychain.toychain.controller;

import com.toychain.toychain.model.Block;
import com.toychain.toychain.service.MinerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class MinerController {
    @Autowired
    private MinerService minerService;


    @GetMapping("/latestBlock")
    public Block latestBlock() {
        return minerService.getLastBlock();
    }

}
