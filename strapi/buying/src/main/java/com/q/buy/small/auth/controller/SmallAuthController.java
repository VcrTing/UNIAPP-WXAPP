package com.q.buy.small.auth.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.common.CommonParam;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.param.AuthWxPhoneParam;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.small.auth.tool.SmallAppWxTool;
import com.q.buy.small.auth.util.WXBizDataCrypt;
import com.q.buy.util.q.QVUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Slf4j
@RestController
@RequestMapping(NetConfig.AUTH_LINK + "phone")
public class SmallAuthController {
    @Autowired
    SmallAppWxTool wxTool;

    @Autowired
    XUserServiceImpl userService;

    // /api/auth/phone/wx
    @PostMapping("/wx")
    public HResult<?> wx( @RequestBody CommonParam param ) throws Exception {
        param.checkData();
        return HResult.ok( wxTool.getPhoneResponse(param.getDocumentId()).getBody() );
    }
    @PostMapping("/wx2")
    public HResult<XUser> wx2( @RequestBody AuthWxPhoneParam param ) throws Exception {
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
        Map<String, Object> map = JSONUtil.toBean(data, Map.class);

        // 3. 获取 openId
        String openId = response.getStr("openid");
        System.out.println(openId);
        // 4. 改动 openId
        XUser user = userService.registerUser(param.getCode(),
                QVUtil.serStr(map.get("phone")),
                QVUtil.serInt(map.get("countryCode"), 86),
                QVUtil.serStr(openId)
                );

        // wxTool.getPhoneResponse(param.getDocumentId()).getBody()
        return HResult.ok( user );
    }
}
