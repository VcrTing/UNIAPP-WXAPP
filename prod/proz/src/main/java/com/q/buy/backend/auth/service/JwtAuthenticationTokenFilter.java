package com.q.buy.backend.auth.service;

import cn.hutool.core.text.AntPathMatcher;
import com.q.buy.backend.auth.SecurityConfig;
import com.q.buy.backend.auth.common.AuthConstant;
import com.q.buy.backend.auth.house.LoginUser;
import com.q.buy.backend.util.JwtUtil;
import com.q.buy.common.redis.CacheTool;
import com.q.buy.framework.exception.QException;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    CacheTool cacheTool;

    @Autowired
    XUserServiceImpl xUserService;

    public boolean isInWhiteList(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        AntPathMatcher pathMatcher = new AntPathMatcher();
        return Arrays.stream(SecurityConfig.WHITE_LIST)
                .anyMatch(pattern -> pathMatcher.match(pattern, requestURI));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        if (isInWhiteList(httpServletRequest)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        String token = httpServletRequest.getHeader("Authorization");
        //
        if (QVUtil.notLen(token)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        else {
            if (!token.startsWith("Bearer ")) { throw new ServletException("Invalid token"); }
            else {
                token = token.replace("Bearer ", "");
            }
        }
        Long uid;
        LoginUser loginUser;
        try {
            uid = QVUtil.serLong(JwtUtil.parse(token), null);
            XUser xUser = xUserService.getById(uid);
            loginUser = new LoginUser(xUser);
        }
        catch (Exception e) { throw new ServletException("Invalid token"); }
        //
        if (loginUser == null) {
            throw new QException("Login again.");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
