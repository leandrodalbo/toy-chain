package com.toychain.toychain.service;

import com.toychain.toychain.exceptions.InvalidTransactionException;
import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.hashing.HashingComponent;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import com.toychain.toychain.props.Props;
import com.toychain.toychain.repositories.BlocksRepository;
import com.toychain.toychain.transactions.NextBlockTransactions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class MinerServiceTest {

    @Mock
    private BlocksRepository repository;

    @Mock
    private Props props;

    @Mock
    private HashingComponent hashingComponent;

    @Mock
    private NextBlockTransactions nextBlockTransactions;

    @InjectMocks
    private MinerService service;

    @Test
    public void willGetTheLatestBlock() {

        when(repository.latestBlock()).thenReturn(new Block("ABC111", "CBA321", new Date()));


        Block latestBlock = service.getLastBlock();

        assertThat(latestBlock).isNotNull();
        verify(repository, times(1)).latestBlock();

    }

    @Test
    public void willStartANewChain() throws SeedingFailedException {

        when(repository.latestBlock()).thenReturn(null);
        when(repository.save(any())).thenReturn(new Block());
        when(props.getNonce()).thenReturn(2);
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));

        Block seedBlock = service.seedChain();

        assertThat(seedBlock).isNotNull();
        verify(repository, times(1)).latestBlock();
        verify(repository, times(1)).save(any());

    }

    @Test
    public void willNotStartANewChainIfABlockExists() throws SeedingFailedException {

        when(repository.latestBlock()).thenReturn(new Block());
        when(props.getNonce()).thenReturn(2);
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));


        assertThatThrownBy(() -> service.seedChain()).isInstanceOf(SeedingFailedException.class);


        verify(repository, times(1)).latestBlock();
        verify(repository, times(0)).save(any());

    }

    @Test
    public void willKeepANewTransactionUntilANewBlockIsMined() throws SeedingFailedException, InvalidTransactionException {

        doNothing().when(nextBlockTransactions).addTransaction(any());
        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.of("arywruweu"));

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("aag0F0AFA4");
        t.setReceiver("SFG45ADF4SA");

        Transaction result = service.addTransaction(t);


        assertThat(result.getHash()).isNotNull();
        assertThat(result.getHash()).isNotEmpty();
        verify(nextBlockTransactions, times(1)).addTransaction(any());
    }

    @Test
    public void willReturnThePendingTransactions() throws SeedingFailedException, InvalidTransactionException {

        when(nextBlockTransactions.allTransactions()).thenReturn(List.of(new Transaction()));


        List<Transaction> result = service.pendingTransactions();


        assertThat(result).isNotNull();
        assertThat(result.size()).isGreaterThan(0);

        verify(nextBlockTransactions, times(1)).allTransactions();
    }


    @Test
    public void ExceptionIsThrownWhenATransactionIsNull() throws SeedingFailedException, InvalidTransactionException {

        assertThatThrownBy(() -> service.addTransaction(null)).isInstanceOf(InvalidTransactionException.class);


        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }

    @Test
    public void ExceptionIsThrownWhenTheHashGenerationFailed() throws SeedingFailedException, InvalidTransactionException {


        when(hashingComponent.generateHash(anyString())).thenReturn(Optional.empty());

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("aag0F0AFA4");
        t.setReceiver("SFG45ADF4SA");

        assertThatThrownBy(() -> service.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(1)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


    @Test
    public void ExceptionIsThrownWithoutASender() throws SeedingFailedException, InvalidTransactionException {

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("");
        t.setReceiver("SFG45ADF4SA");

        assertThatThrownBy(() -> service.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


    @Test
    public void ExceptionIsThrownWithoutAReceiver() throws SeedingFailedException, InvalidTransactionException {

        Transaction t = new Transaction();
        t.setAmount(5.0);
        t.setSender("AAA333FFF333");
        t.setReceiver("");

        assertThatThrownBy(() -> service.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }

    @Test
    public void ExceptionIsThrownWithoutAValidAmount() throws SeedingFailedException, InvalidTransactionException {

        Transaction t = new Transaction();
        t.setAmount(null);
        t.setSender("AAA333FFF333");
        t.setReceiver("aa33bgb333");

        assertThatThrownBy(() -> service.addTransaction(t)).isInstanceOf(InvalidTransactionException.class);

        verify(hashingComponent, times(0)).generateHash(any());
        verify(nextBlockTransactions, times(0)).addTransaction(any());
    }


}
