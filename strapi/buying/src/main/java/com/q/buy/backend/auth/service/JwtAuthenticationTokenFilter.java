package com.q.buy.backend.auth.service;

import com.q.buy.backend.auth.common.AuthConstant;
import com.q.buy.backend.auth.house.LoginUser;
import com.q.buy.backend.util.JwtUtil;
import com.q.buy.common.redis.CacheTool;
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

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    CacheTool cacheTool;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String token = httpServletRequest.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) { throw new ServletException("Invalid token"); }
        if (QVUtil.notLen(token)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        Long uid;
        LoginUser loginUser;
        try {
            uid = QVUtil.serLong(JwtUtil.parse(token), null);
            loginUser = cacheTool.get(AuthConstant.K_CACHE + uid);
        }
        catch (Exception e) { throw new ServletException("Invalid token"); }
        //
        if (loginUser == null) {
            throw new ServletException("Login again.");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
