package com.toychain.toychain.repositories;

import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionsRepository extends CrudRepository<Transaction, String> {
    @Query(value = "select * from transactions where block_hash = ?1", nativeQuery = true)
    List<Transaction> transactionsByBlock(String blockHash);
}
