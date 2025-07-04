package com.q.buy.small.auth.controller;

import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.form.XUserLoginForm;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserAuthServiceImpl;
import com.q.buy.small.auth.service.XUserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(NetConfig.AUTH_LINK + "x-users")
public class XAuthController {
    // 小程序获取
    @Autowired
    XUserServiceImpl xUserService;

    @Autowired
    XUserAuthServiceImpl authService;

    // /api/small/auth/x-users/register-or-login
    @PostMapping("/register-or-login")
    public HResult<XUser> has(@RequestBody XUserLoginForm param ) {
        return HResult.ok( authService.registerOrLogin(param.getCountryCode(), param.getPhone()) );
    }

    // localhost:8888/api/small/auth/x-users/all
    @GetMapping("/all")
    public HResult<List<XUser>> all() {
        return HResult.ok( xUserService.list() );
    }
}
