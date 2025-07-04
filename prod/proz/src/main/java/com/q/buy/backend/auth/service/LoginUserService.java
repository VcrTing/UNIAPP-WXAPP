package com.q.buy.backend.auth.service;

import com.q.buy.backend.auth.common.AuthConstant;
import com.q.buy.backend.auth.house.AuthResult;
import com.q.buy.backend.auth.house.LoginUser;
import com.q.buy.backend.util.JwtUtil;
import com.q.buy.common.redis.CacheTool;
import com.q.buy.framework.exception.QException;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class LoginUserService {

    @Autowired
    CacheTool cacheTool;

    @Autowired
    XUserServiceImpl xUserService;

    @Autowired
    AuthenticationManager authenticationManager;

    public AuthResult<XUser> registerOrLogin(Integer countryCode, String phone, String password) {
        XUser user = this.registerOrLogin(countryCode, phone);
        if (QVUtil.hasLen(user.getPhone())) { return login(phone, password); }
        throw new QException("Login Fail.");
    }

    final Object addLock = new Object();

    @Autowired
    PasswordEncoder passwordEncoder;

    XUser registerOrLogin(Integer countryCode, String phone) {
        XUser old = QListUtil.first(xUserService.phone(phone));
        if (old == null) {
            // 注册
            synchronized (addLock) {
                XUser user = xUserService.getRegisterUser(phone, countryCode, phone, phone);
                user.setPasswordBackend(passwordEncoder.encode(user.getPasswordBackend()));
                if (!xUserService.save(user)) { xUserService.save(user); }
                System.out.println("注册一个新用户 ========== " + user.toString());
                return user;
            }
        }
        return old;
    }

    AuthResult<XUser> login(String phone, String password) {
        if (QVUtil.notLen(phone) || QVUtil.notLen(password)) { throw new QException("Invalid username or password"); }
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(phone, password)
        );
        if (auth == null) { throw new BadCredentialsException("Invalid username or password"); }
        LoginUser loginUser = (LoginUser) auth.getPrincipal();
        XUser user = loginUser.getUser();
        String id = QVUtil.serStr(user.getId());
        cacheTool.refresh(AuthConstant.K_CACHE + id, loginUser, CacheTool.LIVE_SECOND_LOGIN);
        user.keepSecurity();
        return AuthResult.ok(JwtUtil.generate(id, phone), user);
    }
}
