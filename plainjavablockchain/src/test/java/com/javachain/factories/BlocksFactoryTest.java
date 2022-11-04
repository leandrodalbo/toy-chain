package com.javachain.factories;

import com.javachain.model.Block;
import org.junit.jupiter.api.Test;

import java.util.LinkedList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class BlocksFactoryTest {

    @Test
    public void willCreateABlockWithTheValuesPassed() {

        Block result = BlocksFactory.withAllValues(new byte[]{0}, new byte[]{0}, new byte[]{0}, "22/06/1990", 32, 22, 0.9, List.of());

        assertThat(result.getTimestamp()).isEqualTo("22/06/1990");
        assertThat(result.getLedgerId()).isEqualTo(32);
        assertThat(result.getMiningPoints()).isEqualTo(22);
        assertThat(result.getLuck()).isEqualTo(0.9);
    }

    @Test
    public void willCreateABlockWithDefaultValues() {

        Block result = BlocksFactory.withDefaults();

        assertThat(result.getTimestamp()).isEqualTo("");
        assertThat(result.getLedgerId()).isEqualTo(-1);
        assertThat(result.getMiningPoints()).isEqualTo(0);
        assertThat(result.getLuck()).isEqualTo(0.0);
    }

    @Test
    public void willCreateABlockFromHeader() {

        Block existingBlock = BlocksFactory.withDefaults();
        LinkedList<Block> chain = new LinkedList<>();
        chain.add(existingBlock);

        Block result = BlocksFactory.fromChainHeader(chain);

        assertThat(result.getPreviousHash()).isEqualTo(existingBlock.getCurrentHash());
        assertThat(result.getTimestamp()).isEqualTo("");
        assertThat(result.getLedgerId()).isEqualTo(0);
        assertThat(result.getMiningPoints()).isEqualTo(0);
        assertThat(result.getLuck()).isNotEqualTo(0.0);
    }


}
