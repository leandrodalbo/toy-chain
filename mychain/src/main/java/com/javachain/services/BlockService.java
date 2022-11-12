package com.javachain.services;

import com.javachain.model.Block;
import org.springframework.stereotype.Service;

import java.security.*;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

@Service
public class BlockService {

    public boolean isAVerifiedBlock(Block block, Signature signature) throws InvalidKeyException, SignatureException, NoSuchAlgorithmException, InvalidKeySpecException {
        RSAPublicKey publicKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(block.getMinedBy()));
        signature.initVerify(publicKey);
        signature.update(block.toString().getBytes());
        return signature.verify(block.getCurrentHash());
    }
}
