package com.toychain.toychain.hashing;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class HashingComponentTest {

    private final HashingComponent hashingComponent = new HashingComponent();


    @Test
    public void willCreateAHashForTheGivenString() {
        String anyStringValue = "customStringValue";

        Optional<String> result = hashingComponent.generateHash(anyStringValue);

        assertThat(result.get()).isNotNull();
        assertThat(result.get()).isNotEmpty();

    }
}
