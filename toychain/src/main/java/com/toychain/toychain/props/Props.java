package com.toychain.toychain.props;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

@Getter
@AllArgsConstructor
public class Props {

    @Value("${toyChain.transactionsPerBlock}")
    private String userBucketPath;

    @Value("${toyChain.proofOfWork}")
    private String proofOfWork;
}
