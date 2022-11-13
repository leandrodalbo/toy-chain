package com.toychain.toychain.transactions;

import com.toychain.toychain.model.Transaction;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NextBlockTransactions {


    private final List<Transaction> transactions = new ArrayList<Transaction>();

    public void removeAllPendingTransactions() {
        this.transactions.clear();
    }

    public void addTransaction(Transaction transaction) {
        transactions.add(transaction);
    }

    public List<Transaction> allTransactions() {
        return transactions;
    }
}
