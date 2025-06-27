package com.q.buy.backend.auth.house;

import com.q.buy.framework.exception.QException;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthLoginForm {
    Integer countryCode;
    String identifier;
    String password;

    public void check() {
        if (QVUtil.notLen(countryCode)) throw new QException("无Code");
        if (QVUtil.notLen(identifier)) throw new QException("无id");
        if (QVUtil.notLen(password)) throw new QException("无密码");
    }
}
