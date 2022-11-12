package com.toychain.toychain.controller;


import com.toychain.toychain.model.Block;
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
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

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
    public void wilLGetAllSports() throws Exception {
        Block result = new Block("ABC111", "CBA321", new Date());

        given(minerService.getLastBlock()).
                willReturn(result);

        MockHttpServletResponse res = mvc.perform(
                        get("/latestBlock").contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        then(res.getStatus()).isEqualTo(HttpStatus.OK.value());
        then(res.getContentAsString()).isEqualTo(jsonData.write(result).getJson());

    }

}
