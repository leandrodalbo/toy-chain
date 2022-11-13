package com.toychain.toychain.service;

import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.hashing.HashingComponent;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.props.Props;
import com.toychain.toychain.repositories.BlocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MinerService {

    @Autowired
    private Props props;

    @Autowired
    private HashingComponent hashingComponent;

    @Autowired
    private BlocksRepository blocksRepository;


    public Block getLastBlock() {

        return blocksRepository.latestBlock();
    }

    public Block seedChain() throws SeedingFailedException {

        String seed = "0".repeat(Math.max(0, props.getNonce())) +
                "seedBlock";

        Optional<String> seedHash = hashingComponent.generateHash(seed);


        if (seedHash.isEmpty() || blocksRepository.latestBlock() != null) {
            throw new SeedingFailedException();
        } else {
            Block seedBlock = new Block();
            seedBlock.setHash(seedHash.get());
            return blocksRepository.save(seedBlock);
        }
    }

    public String generateBlock() {
        return null;
    }

    public String addTransaction() {
        return null;
    }


    public boolean isValidHash() {
        return false;
    }

}
