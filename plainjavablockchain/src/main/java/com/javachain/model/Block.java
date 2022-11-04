package com.javachain.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;


@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
public class Block implements Serializable {
    private byte[] previousHash;
    private byte[] currentHash;
    private byte[] minedBy;
    private String timestamp;
    private Integer ledgerId;
    private Integer miningPoints;
    private Double luck;
    private List<Transaction> transactions;
}
