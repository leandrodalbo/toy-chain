package com.toychain.toychain.props;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "toychain")
@Getter
@Setter
public class Props {

    private int nonce;
}
