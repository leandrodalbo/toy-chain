package com.javachain.factories;

import com.javachain.model.Block;
import com.javachain.model.Transaction;

import java.util.LinkedList;
import java.util.List;

public class BlocksFactory {

    public static Block withAllValues(
            byte[] previousHash,
            byte[] currentHash,
            byte[] minedBy,
            String timestamp,
            Integer ledgerId,
            Integer miningPoints,
            Double luck,
            List<Transaction> transactions) {
        return new Block(previousHash, currentHash, minedBy, timestamp, ledgerId, miningPoints, luck, transactions);
    }

    public static Block withDefaults() {
        return new Block(new byte[]{0}, new byte[]{0}, new byte[]{0}, "", -1, 0, 0.0, List.of());
    }

    public static Block fromChainHeader(LinkedList<Block> chain) {
        Block headerBlock = chain.getLast();
        return new Block(headerBlock.getCurrentHash(), new byte[]{0}, new byte[]{0}, "", headerBlock.getLedgerId() + 1, 0, Math.random() * 1000000, List.of());
    }
}
