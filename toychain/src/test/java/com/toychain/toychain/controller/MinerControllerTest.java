package com.toychain.toychain.controller;


import com.toychain.toychain.exceptions.InvalidTransactionException;
import com.toychain.toychain.exceptions.SeedingFailedException;
import com.toychain.toychain.model.Block;
import com.toychain.toychain.model.Transaction;
import com.toychain.toychain.service.MinerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.BDDAssertions.then;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ExtendWith(SpringExtension.class)
@AutoConfigureJsonTesters
@WebMvcTest(MinerController.class)
public class MinerControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private MinerService minerService;

    @Autowired
    private JacksonTester jsonData;


    @Test
    public void willGetLatestBlock() throws Exception {
        Block result = new Block("ABC111", "CBA321", new Date());

        given(minerService.getLastBlock()).willReturn(result);

        MockHttpServletResponse res = mvc.perform(get("/latestBlock").contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.OK.value());

    }

    @Test
    public void wontSeedTheChain() throws Exception {
        given(minerService.seedChain()).willThrow(new SeedingFailedException());

        MockHttpServletResponse res = mvc.perform(get("/seedChain").contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());

    }

    @Test
    public void willSeedTheChain() throws Exception {
        given(minerService.seedChain()).willReturn(new Block());

        MockHttpServletResponse res = mvc.perform(get("/seedChain").contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.OK.value());

    }

    @Test
    public void willGetThePendingTransactions() throws Exception {
        given(minerService.pendingTransactions()).willReturn(List.of(new Transaction()));

        MockHttpServletResponse res = mvc.perform(get("/pendingTransactions").contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.OK.value());

    }

    @Test
    public void shouldAddANewTransaction() throws Exception {
        Transaction transaction = new Transaction();

        given(minerService.addTransaction(any())).
                willReturn(transaction);

        MockHttpServletResponse res = mvc.perform(
                        post("/addTransaction").contentType(MediaType.APPLICATION_JSON)
                                .content(jsonData.write(transaction).getJson()))
                .andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.OK.value());
        then(res.getContentAsString()).isEqualTo(jsonData.write(transaction).getJson());

    }


    @Test
    public void shouldGetABadRequestIfTheServiceFails() throws Exception {

        given(minerService.addTransaction(any())).
                willThrow(InvalidTransactionException.class);

        MockHttpServletResponse res = mvc.perform(
                        post("/addTransaction").contentType(MediaType.APPLICATION_JSON)
                                .content(jsonData.write(new Transaction()).getJson()))
                .andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());


    }
}
