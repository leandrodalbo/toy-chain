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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class MinerServiceTest {

    @Mock
    private BlocksRepository blocksRepository;

    @Mock
    private TransactionsRepository transactionsRepository;
    @Mock
    private Props props;

    @Mock
    private HashingComponent hashingComponent;

    @Mock
    private NextBlockTransactions nextBlockTransactions;

    @InjectMocks
    private MinerService minerService;

    @Test
    public void willGetTheLatestBlock() {

        when(blocksRepository.latestBlock()).thenReturn(new Block("ABC111", "CBA321", new Date()));


        Block latestBlock = minerService.getLastBlock();

        assertThat(latestBlock).isNotNull();
        verify(blocksRepository, times(1)).latestBlock();

    }

    @Test
    public void willStartANewChain() throws SeedingFailedException {

        when(blocksRepository.latestBlock()).thenReturn(null);
        when(blocksRepository.save(any())).thenReturn(new Block());
        when(props.getNonce()).thenReturn(2);
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));

        Block seedBlock = minerService.seedChain();

        assertThat(seedBlock).isNotNull();
        verify(blocksRepository, times(1)).latestBlock();
        verify(blocksRepository, times(1)).save(any());

    }

    @Test
    public void willNotStartANewChainIfABlockExists() {

        when(blocksRepository.latestBlock()).thenReturn(new Block());
        when(props.getNonce()).thenReturn(2);
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));


        assertThatThrownBy(() -> minerService.seedChain()).isInstanceOf(SeedingFailedException.class);


        verify(blocksRepository, times(1)).latestBlock();
        verify(blocksRepository, times(0)).save(any());

    }

    @Test
    public void willKeepANewTransactionUntilANewBlockIsMined() throws InvalidTransactionException {

        doNothing().when(nextBlockTransactions).addTransaction(any());
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("aag0F0AFA4");
        t.setReceiver("SFG45ADF4SA");

        Transaction result = minerService.addTransaction(t);


        assertThat(result.getHash()).isNotNull();
        assertThat(result.getHash()).isNotEmpty();
        verify(nextBlockTransactions, times(1)).addTransaction(any());
    }

    @Test
    public void willReturnThePendingTransactions() {

        when(nextBlockTransactions.allTransactions()).thenReturn(List.of(new Transaction()));


        List<Transaction> result = minerService.pendingTransactions();


        assertThat(result).isNotNull();
        assertThat(result.size()).isGreaterThan(0);

        verify(nextBlockTransactions, times(1)).allTransactions();
    }


    @Test
    public void ExceptionIsThrownWhenATransactionIsNull() {

        assertThatThrownBy(() -> minerService.addTransaction(null)).isInstanceOf(InvalidTransactionException.class);


        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }

    @Test
    public void ExceptionIsThrownWhenTheHashGenerationFailed() {


        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.empty());

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("aag0F0AFA4");
        t.setReceiver("SFG45ADF4SA");

        assertThatThrownBy(() -> minerService.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(1)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


    @Test
    public void ExceptionIsThrownWithoutASender() {

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("");
        t.setReceiver("SFG45ADF4SA");

        assertThatThrownBy(() -> minerService.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


    @Test
    public void ExceptionIsThrownWithoutAReceiver() {

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("AAA333FFF333");
        t.setReceiver("");

        assertThatThrownBy(() -> minerService.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }

    @Test
    public void ExceptionIsThrownWithoutAValidAmount() {

        Transaction t = new Transaction();
        t.setAmount(null);
        t.setSender("AAA333FFF333");
        t.setReceiver("aa33bgb333");

        assertThatThrownBy(() -> minerService.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


    @Test
    public void blockMiningFailsWithoutTransactions() {

        when(nextBlockTransactions.allTransactions()).thenReturn(new ArrayList<>());

        assertThatThrownBy(() -> minerService.generateBlock()).isInstanceOf(BlockGenerationException.class);

        verify(blocksRepository, times(0)).save(any());
        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(1)).allTransactions();

    }

    @Test
    public void blockMiningFailsWithoutASeed() {
        Transaction transaction = new Transaction();
        transaction.setHash("abd3323");
        when(blocksRepository.latestBlock()).thenReturn(null);
        when(nextBlockTransactions.allTransactions()).thenReturn(List.of(transaction));

        assertThatThrownBy(() -> minerService.generateBlock()).isInstanceOf(BlockGenerationException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(1)).allTransactions();
        verify(blocksRepository, times(1)).latestBlock();
        verify(blocksRepository, times(0)).save(any());
    }

    @Test
    public void blockMiningIsSuccessful() throws BlockGenerationException {
        Transaction transaction = new Transaction();
        transaction.setHash("abd3323");

        Block seedBlock = new Block();
        seedBlock.setHash("0000aaa23bbb2");

        when(transactionsRepository.saveAll(any())).thenReturn(new ArrayList<>());
        when(blocksRepository.save(any())).thenReturn(new Block());
        when(blocksRepository.latestBlock()).thenReturn(seedBlock);
        when(nextBlockTransactions.allTransactions()).thenReturn(List.of(transaction));
        doNothing().when(nextBlockTransactions).removeAllPendingTransactions();
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("0000bbb33ddd333"));

        Block newBlock = minerService.generateBlock();

        assertThat(newBlock).isNotNull();


        verify(transactionsRepository, times(1)).saveAll(any());
        verify(hashingComponent, times(1)).generateHash(any());
        verify(nextBlockTransactions, times(1)).allTransactions();
        verify(nextBlockTransactions, times(1)).removeAllPendingTransactions();
        verify(blocksRepository, times(1)).latestBlock();
        verify(blocksRepository, times(1)).save(any());
    }


    @Test
    public void willReturnAllTheBlocks() {

        when(blocksRepository.findAll()).thenReturn(List.of(new Block()));
        when(transactionsRepository.transactionsByBlock(any())).thenReturn(List.of(new Transaction()));

        List<Block> allBlocks = minerService.allBlocks();

        assertThat(allBlocks.size()).isGreaterThan(0);

        verify(blocksRepository, times(1)).findAll();
        verify(transactionsRepository, times(1)).transactionsByBlock(any());
    }


    @Test
    public void willReturnAllTheSavedTransactions() {

        when(transactionsRepository.findAll()).thenReturn(List.of(new Transaction()));

        List<Transaction> allSavedTransactions = minerService.allSavedTransactions();

        assertThat(allSavedTransactions.size()).isGreaterThan(0);

        verify(transactionsRepository, times(1)).findAll();
    }

}
