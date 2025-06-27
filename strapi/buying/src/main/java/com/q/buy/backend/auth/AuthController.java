package com.q.buy.backend.auth;

import com.q.buy.backend.auth.house.AuthLoginForm;
import com.q.buy.backend.auth.house.AuthResult;
import com.q.buy.backend.auth.service.LoginUserService;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.auth.model.entity.XUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    LoginUserService loginUserService;

    // api/auth/login
    @PostMapping("/login")
    public AuthResult<XUser> wx(@RequestBody AuthLoginForm param ) throws Exception {
        param.check();
        return loginUserService.registerOrLogin(
                param.getCountryCode(),
                param.getIdentifier(),
                param.getPassword());
    }

}
