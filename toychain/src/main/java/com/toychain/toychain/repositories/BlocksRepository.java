package com.toychain.toychain.repositories;

import com.toychain.toychain.model.Block;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface BlocksRepository extends CrudRepository<Block, String> {

    @Query(value = "select * from blocks where timestamp = (select max(timestamp) from blocks) limit 1", nativeQuery = true)
    Block latestBlock();
}
