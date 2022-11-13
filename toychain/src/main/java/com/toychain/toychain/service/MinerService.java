package com.toychain.toychain.service;

import com.toychain.toychain.exceptions.InvalidTransactionException;
import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.hashing.HashingComponent;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import com.toychain.toychain.props.Props;
import com.toychain.toychain.repositories.BlocksRepository;
import com.toychain.toychain.transactions.NextBlockTransactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MinerService {

    @Autowired
    private Props props;

    @Autowired
    private HashingComponent hashingComponent;

    @Autowired
    private BlocksRepository blocksRepository;


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

    public String generateBlock() {
        return null;
    }

    public Transaction addTransaction(Transaction transaction) throws InvalidTransactionException {

        validateTransaction(transaction);

        String inputBuilder = transaction.getSender() +
                transaction.getReceiver() +
                transaction.getAmount() +
                ZonedDateTime.now().toInstant().toEpochMilli();

        Optional<String> transactionHash = hashingComponent.generateHash(inputBuilder);

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


    private void validateTransaction(Transaction transaction) throws InvalidTransactionException {
        boolean nullObject = (transaction == null);

        boolean nullFields = (transaction != null) && (transaction.getAmount() == null || transaction.getSender() == null || transaction.getReceiver() == null);

        boolean invalidValues = (transaction != null) && (transaction.getSender().isEmpty() || transaction.getReceiver().isEmpty());

        if (nullObject || nullFields || invalidValues) {
            throw new InvalidTransactionException();
        }
    }

}
