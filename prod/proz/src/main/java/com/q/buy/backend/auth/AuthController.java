package com.q.buy.backend.auth;

import com.q.buy.backend.auth.house.AuthLoginForm;
import com.q.buy.backend.auth.house.AuthResult;
import com.q.buy.backend.auth.service.LoginUserService;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.model.entity.XUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping( NetConfig.API + "/auth")
public class AuthController {

    @Autowired
    LoginUserService loginUserService;

    // localhost:8889/backend/auth
    @GetMapping
    public HResult<?> login() {
        return HResult.ok();
    }

    // backend/auth/login
    @PostMapping("/login")
    public AuthResult<XUser> wx(@RequestBody AuthLoginForm param ) throws Exception {
        param.check();
        return loginUserService.registerOrLogin(
                param.getCountryCode(),
                param.getIdentifier(),
                param.getPassword());
    }

}
