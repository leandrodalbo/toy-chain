package com.toychain.toychain.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Entity(name = "blocks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//insert into blocks(HASH, PREVIOUS_HASH, TIMESTAMP) VALUES('45DFG', 'CBA332', now())
public class Block {

    @Id
    @Column(name = "hash")
    private String hash;

    @Column(name = "previous_hash")
    private String previousHash;

    @Column(name = "timestamp", nullable = false, updatable = false)
    @CreationTimestamp
    private Date timestamp;
}
