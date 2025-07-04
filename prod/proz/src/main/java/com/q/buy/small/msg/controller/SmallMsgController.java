package com.q.buy.small.msg.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.common.CommonParam;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.param.AuthWxPhoneParam;
import com.q.buy.small.auth.tool.SmallAppWxTool;
import com.q.buy.small.auth.util.WXBizDataCrypt;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping(NetConfig.SMALL_LINK + "msg")
public class SmallMsgController {
    @Autowired
    SmallAppWxTool wxTool;

    // /api/small/msg/send
    @PostMapping("/send")
    public HResult<?> send( @RequestBody AuthWxPhoneParam param ) throws Exception {
        // param.checkData();
        String appId = wxTool.getAppId();
        String appSecret = wxTool.getAppSecret();
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appId +
                "&secret=" + appSecret +
                "&js_code=" + param.getCode() +
                "&grant_type=authorization_code";

        JSONObject response = JSONUtil.toBean(HttpUtil.get(url), JSONObject.class);
        System.out.println(response);

        // 2. 解密手机号
        WXBizDataCrypt pc = new WXBizDataCrypt(appId, response.getStr("session_key"));
        String data = pc.decryptData(param.getEncryptedData(), param.getIv());
        System.out.println(data);
        // wxTool.getPhoneResponse(param.getDocumentId()).getBody()
        return HResult.ok(  );
    }
}
