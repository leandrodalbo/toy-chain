package com.toychain.toychain.service;

import com.toychain.toychain.exceptions.BlockGenerationException;
import com.toychain.toychain.exceptions.InvalidTransactionException;
import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.hashing.HashingComponent;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import com.toychain.toychain.props.Props;
import com.toychain.toychain.repositories.BlocksRepository;
import com.toychain.toychain.repositories.TransactionsRepository;
import com.toychain.toychain.transactions.NextBlockTransactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MinerService {

    @Autowired
    private Props props;

    @Autowired
    private HashingComponent hashingComponent;

    @Autowired
    private BlocksRepository blocksRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private NextBlockTransactions nextBlockTransactions;

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

    @Transactional
    public Block generateBlock() throws BlockGenerationException {

        List<Transaction> pendingTransactions = new ArrayList<>(nextBlockTransactions.allTransactions());
        nextBlockTransactions.removeAllPendingTransactions();
        Block latestBlock = blocksRepository.latestBlock();
        Optional<String> newBlockHash;
        int nonce = 0;

        if (pendingTransactions.size() == 0 || latestBlock == null) {
            throw new BlockGenerationException();
        }

        do {

            String hashInput = latestBlock.getHash() +
                    pendingTransactions.stream().map(Transaction::getHash).collect(Collectors.joining()) +
                    ZonedDateTime.now().toInstant().toEpochMilli() + nonce;
            newBlockHash = hashingComponent.generateHash(hashInput);

            nonce++;
        }
        while ((newBlockHash.isEmpty() || !newBlockHash.get().startsWith("0".repeat(Math.max(0, props.getNonce())))));

        final String generatedBlocKHash = newBlockHash.get();
        Block b = new Block();
        b.setPreviousHash(latestBlock.getHash());
        b.setHash(generatedBlocKHash);

        transactionsRepository.saveAll(pendingTransactions.stream().map(it -> new Transaction(it.getHash(), generatedBlocKHash, it.getSender(), it.getReceiver(), it.getAmount(), null))
                .collect(Collectors.toList()));

        return blocksRepository.save(b);
    }

    public Transaction addTransaction(Transaction transaction) throws InvalidTransactionException {

        validateTransaction(transaction);

        String hashInput = transaction.getSender() +
                transaction.getReceiver() +
                transaction.getAmount() +
                ZonedDateTime.now().toInstant().toEpochMilli();

        Optional<String> transactionHash = hashingComponent.generateHash(hashInput);

        if (transactionHash.isEmpty()) {
            throw new InvalidTransactionException();
        } else {
            transaction.setHash(transactionHash.get());
            nextBlockTransactions.addTransaction(transaction);
            return transaction;
        }
    }

    public List<Transaction> pendingTransactions() {
        return nextBlockTransactions.allTransactions();
    }

    public List<Block> allBlocks() {
        List<Block> blocks = (List<Block>) blocksRepository.findAll();

        return blocks.stream().map((Block block) -> {
            List<Transaction> transactions = transactionsRepository.transactionsByBlock(block.getHash());
            return new Block(block.getHash(), block.getPreviousHash(), block.getTimestamp(), transactions);
        }).collect(Collectors.toList());
    }

    public List<Transaction> allSavedTransactions() {
        return (List<Transaction>) transactionsRepository.findAll();
    }


    private void validateTransaction(Transaction transaction) throws InvalidTransactionException {
        boolean nullObject = (transaction == null);

        boolean nullFields = (transaction != null) && (transaction.getAmount() == null || transaction.getSender() == null || transaction.getReceiver() == null);

        boolean invalidValues = (transaction != null) && (transaction.getSender().isEmpty() || transaction.getReceiver().isEmpty());

        if (nullObject || nullFields || invalidValues) {
            throw new InvalidTransactionException();
        }
    }


}
