package com.toychain.toychain.service;

import com.toychain.toychain.model.Block;
import com.toychain.toychain.repositories.BlocksRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class MinerServiceTest {

    @Mock
    private BlocksRepository repository;

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
}
