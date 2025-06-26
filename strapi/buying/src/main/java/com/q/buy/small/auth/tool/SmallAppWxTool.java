package com.q.buy.small.auth.tool;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class SmallAppWxTool {

    @Value("${small.wx.app-id}")
    String appId;
    public String getAppId() { return appId; }

    @Value("${small.wx.app-secret}")
    String appSecret;
    public String getAppSecret() { return appSecret; }


    @Value("${small.wx.api.url-token}")
    String apiToken;
    @Value("${small.wx.api.url-phone}")
    String apiPhone;

    public ResponseEntity<Object> getPhoneResponse (
            String code
    ) {
        String tokenUrl = String.format(apiToken + "?grant_type=client_credential&appid=%s&secret=%s",
                getAppId(), getAppSecret());
        JSONObject token = JSONUtil.toBean(HttpUtil.get(tokenUrl), JSONObject.class);
        //
        String url = apiPhone + "?access_token=" + token.getStr("access_token");
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("code", code);
        // 封装请求头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(paramMap, headers);
        // 通过 RestTemplate 发送请求，获取到用户手机号码
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> res = restTemplate.postForEntity(url, httpEntity, Object.class);
        return res;
    }
}
