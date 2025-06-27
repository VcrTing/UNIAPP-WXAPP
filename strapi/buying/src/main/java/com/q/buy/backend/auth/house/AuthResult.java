package com.q.buy.backend.auth.house;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResult<T> {
    T user;
    String jwt;
    //
    public static <T> AuthResult<T> ok(String jwt, T user) {
        AuthResult<T> r = new AuthResult<T>();
        r.setJwt(jwt);
        r.setUser(user);
        return r;
    }
}
