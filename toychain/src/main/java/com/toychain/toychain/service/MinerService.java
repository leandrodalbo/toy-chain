package com.toychain.toychain.service;

import com.toychain.toychain.model.Block;
import com.toychain.toychain.repositories.BlocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MinerService {

    @Autowired
    private BlocksRepository blocksRepository;

    public Block getLastBlock() {

        return blocksRepository.latestBlock();
    }

    public void seedChain() {
    }

    public String generateBlockHash() {
        return null;
    }

    public String generateBeTransactionHash() {
        return null;
    }


    public boolean isValidHash() {
        return false;
    }

}
