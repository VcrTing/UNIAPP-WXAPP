package com.q.buy.small.auth.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.small.auth.mappers.XUserMapper;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.util.database.SnowflakeIdWorker;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class XUserAuthServiceImpl extends ServiceImpl<XUserMapper, XUser> {

    SnowflakeIdWorker snow = new SnowflakeIdWorker( 0,0);

    @Autowired
    XUserServiceImpl xUserService;
    /**
     ==============================================================
     */
    public XUser registerOrLogin(Integer countryCode, String phone) {
        // 有用户了
        XUser user = xUserService.registerUser(phone, phone, countryCode, null);
        // 执行登录

        return user;
    }
}
