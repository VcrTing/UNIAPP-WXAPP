package com.q.buy.backend.auth.service;

import com.q.buy.backend.auth.house.LoginUser;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.util.q.QListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    XUserServiceImpl userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<XUser> userList = userService.phone(username);
        if (QListUtil.isBadList(userList)) { throw new UsernameNotFoundException(username + "未找到。"); }
        XUser user = userList.get(0);
        return new LoginUser(user);
    }
}
