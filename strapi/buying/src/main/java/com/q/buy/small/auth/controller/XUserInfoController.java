package com.q.buy.small.auth.controller;

import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.param.info.XUserInfoWxParam;
import com.q.buy.small.auth.service.XUserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(NetConfig.SMALL_LINK + "x-users/info")
public class XUserInfoController {
    // 小程序获取
    @Autowired
    XUserServiceImpl xUserService;

    // /api/small/x-users/info/has
    @PostMapping("/has")
    public HResult<XUser> has(@RequestBody XUserInfoWxParam param ) {
        param.checkData();
        return HResult.ok( xUserService.hasUser(param) );
    }

    // /api/small/x-users/info/save_or_update
    @PostMapping("/save_or_update")
    public HResult<XUser> get(@RequestBody XUserInfoWxParam param ) {
        param.checkData();
        return HResult.ok( xUserService.saveOrUpdate(param) );
    }
}
