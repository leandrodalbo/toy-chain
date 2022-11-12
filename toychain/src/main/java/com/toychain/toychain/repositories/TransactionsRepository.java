package com.toychain.toychain.repositories;

import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<Transaction, String> {

}
