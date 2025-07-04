package com.q.buy.small.auth.util;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.AlgorithmParameters;

public final class WXBizDataCrypt {

    private final String appId;
    private final String sessionKey;

    public WXBizDataCrypt(String appId, String sessionKey) {
        this.appId = appId;
        this.sessionKey = sessionKey;
    }

    public String decryptData(String encryptedData, String iv) throws Exception {
        byte[] sessionKeyBytes = Base64.decodeBase64(sessionKey);
        byte[] encryptedDataBytes = Base64.decodeBase64(encryptedData);
        byte[] ivBytes = Base64.decodeBase64(iv);

        SecretKeySpec skeySpec = new SecretKeySpec(sessionKeyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        AlgorithmParameters params = AlgorithmParameters.getInstance("AES");
        params.init(new IvParameterSpec(ivBytes));
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, params);

        byte[] original = cipher.doFinal(encryptedDataBytes);
        String originalString = new String(original, StandardCharsets.UTF_8);
        return originalString;
    }
}
