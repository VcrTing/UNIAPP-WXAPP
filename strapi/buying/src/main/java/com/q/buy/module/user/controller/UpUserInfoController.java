package com.q.buy.module.user.controller;

import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.module.user.model.entity.UpUser;
import com.q.buy.module.user.param.info.UpUserInfoWxParam;
import com.q.buy.module.user.service.UpUserInfoServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "users/info")
public class UpUserInfoController {
    // 小程序获取
    @Autowired
    UpUserInfoServiceImpl userInfoService;

    // /api/users/info/wx
    @PostMapping("/wx")
    public HResult<?> wx(@RequestBody UpUserInfoWxParam param ) {
        param.checkData();
        return HResult.ok( null );
    }

    // /api/users/info/has
    @PostMapping("/has")
    public HResult<UpUser> has(@RequestBody UpUserInfoWxParam param ) {
        param.checkData();
        return HResult.ok( userInfoService.hasUser(param) );
    }
}
