package com.toychain.toychain.controller;

import com.toychain.toychain.exceptions.BlockGenerationException;
import com.toychain.toychain.exceptions.InvalidTransactionException;
import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import com.toychain.toychain.service.MinerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/")
public class MinerController {
    @Autowired
    private MinerService minerService;


    @GetMapping("/latestBlock")
    public Block latestBlock() {
        return minerService.getLastBlock();
    }

    @GetMapping("/seedChain")
    public Block seedChain() throws SeedingFailedException {
        return minerService.seedChain();
    }

    @GetMapping("/pendingTransactions")
    public List<Transaction> pendingTransactions() {
        return minerService.pendingTransactions();
    }

    @PostMapping("/addTransaction")
    public Transaction addTransaction(@RequestBody Transaction transaction) throws InvalidTransactionException {
        return minerService.addTransaction(transaction);
    }

    @GetMapping("/allBlocks")
    public List<Block> allBlocks() {
        return minerService.allBlocks();
    }

    @GetMapping("/allSavedTransactions")
    public List<Transaction> allTransactions() {
        return minerService.allSavedTransactions();
    }

    @GetMapping("/kickMining")
    public Block mineNewBlock() throws BlockGenerationException {
        return minerService.generateBlock();
    }

}
