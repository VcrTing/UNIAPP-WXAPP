package com.q.buy.small.auth.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthWxPhoneParam {
    String code;
    String encryptedData;
    String iv;
}
