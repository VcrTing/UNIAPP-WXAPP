package com.q.buy.backend.util;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import com.q.buy.framework.exception.QException;
import com.q.buy.util.q.QVUtil;

import java.util.*;

public final class JwtUtil {
    static long hour = 1000 * 60 * 60;
    static String SC = "VCR_TING";

    public static String generate(String id, String phone) {
        if (QVUtil.notLen(id)) { throw new QException("Login Fail. ID Empty."); }

        Map<String, Object> payload = new HashMap<>();
        payload.put("phone", phone);
        payload.put("id", id);
        payload.put("exp", System.currentTimeMillis() + ( hour * 24 * 7)); // 过期时间24小时后

        return JWTUtil.createToken(payload, SC.getBytes());
    }

    public static String parse(String token) {
        JWT jwt = JWTUtil.parseToken(token);
        return QVUtil.serStr(jwt.getPayload("id"));
    }
}