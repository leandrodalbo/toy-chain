package com.toychain.toychain.service;

import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.hashing.HashingComponent;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.props.Props;
import com.toychain.toychain.repositories.BlocksRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
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

    @InjectMocks
    private MinerService service;

    @Test
    public void willGetTheLatestBlock() {

        when(repository.latestBlock())
                .thenReturn(new Block("ABC111", "CBA321", new Date()));


        Block latestBlock = service.getLastBlock();

        assertThat(latestBlock).isNotNull();
        verify(repository, times(1)).latestBlock();

    }

    @Test
    public void willStartANewChain() throws SeedingFailedException {

        when(repository.latestBlock())
                .thenReturn(null);
        when(repository.save(any()))
                .thenReturn(new Block());
        when(props.getNonce())
                .thenReturn(2);
        when(hashingComponent.generateHash(anyString()))
                .thenReturn(Optional.of("arywruweu"));

        Block seedBlock = service.seedChain();

        assertThat(seedBlock).isNotNull();
        verify(repository, times(1)).latestBlock();
        verify(repository, times(1)).save(any());

    }

    @Test
    public void willNotStartANewChainIfABlockExists() throws SeedingFailedException {

        when(repository.latestBlock())
                .thenReturn(new Block());
        when(props.getNonce())
                .thenReturn(2);
        when(hashingComponent.generateHash(anyString()))
                .thenReturn(Optional.of("arywruweu"));


        assertThatThrownBy(() -> service.seedChain())
                .isInstanceOf(SeedingFailedException.class);


        verify(repository, times(1)).latestBlock();
        verify(repository, times(0)).save(any());

    }
}
