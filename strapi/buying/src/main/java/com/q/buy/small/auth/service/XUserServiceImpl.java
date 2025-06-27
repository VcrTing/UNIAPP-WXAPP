package com.q.buy.small.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.small.auth.mappers.XUserMapper;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.param.info.XUserInfoWxParam;
import com.q.buy.util.database.SnowflakeIdWorker;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class XUserServiceImpl extends ServiceImpl<XUserMapper, XUser> {

    SnowflakeIdWorker snow = new SnowflakeIdWorker( 0,0);

    public XUser getByDocumentId(String documentId) {
        LambdaQueryWrapper<XUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XUser::getDocumentId, documentId);
        List<XUser> list = list(wrapper);
        return QListUtil.first(list);
    }
    public List<XUser> phone(String phone) {
        LambdaQueryWrapper<XUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XUser::getPhone, phone);
        wrapper.orderByAsc(XUser::getUpdatedAt);
        return this.list(wrapper);
    }

    final static Object addLock = new Object();

    // register user
    public XUser getRegisterUser(
            String phone, Integer countryCode, String code, String openId
    ) {
        XUser user = new XUser();
        Long docId = snow.nextId();
        user.setDocumentId(QVUtil.serStr(docId));
        user.setPhone(phone);
        user.setNickName("用户_" + phone);
        user.setUsername(phone);
        user.setEmail(user.generateEmail());
        user.setCountryCode(countryCode);
        user.setSmallAppOpenId(openId);
        user.setSmallAppAuthCode(phone);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setPasswordBackend(user.generateRegisterPassword());
        return user;
    }
    // register user
    public XUser registerUser(
            String code, String phone, Integer countryCode, String openId
    ) {
        List<XUser> userList = phone(phone);
        if (QListUtil.isNiceList(userList)) {
            //
            for (XUser user : userList) {
                user.setUpdatedAt(new Date());
                user.setSmallAppAuthCode(code);
                user.setSmallAppOpenId(openId);
            }
            return QListUtil.first(userList);
        }
        else {
            synchronized (addLock) {
                XUser user = getRegisterUser(phone, countryCode, code, openId);
                if (!this.save(user)) {
                    this.save(user);
                }
                return user;
            }
        }
    }

    // 注册或改动用户数据
    public XUser saveOrUpdate(XUserInfoWxParam xUserInfoWxParam) {
        List<XUser> oldList = phone(xUserInfoWxParam.getPhone());
        XUser user = xUserInfoWxParam.toEntity(QListUtil.first(oldList));
        if (QVUtil.notLen(user.getDocumentId())) {
            // 新增
            Long id = snow.nextId();
            user.setCreatedAt(new Date());
            user.setDocumentId(QVUtil.serStr(id));
            this.save(user);
        }
        else {
            // 修改
            this.updateById(user);
        }
        return user;
    }

    // 微信获取用户数据
    public XUser hasUser(String phone) {
        List<XUser> userList = this.phone(phone);
        if (QListUtil.isBadList(userList)) {
            return null;
        }
        return userList.get(0);
    }
    public XUser hasUser(XUserInfoWxParam param) {
        return hasUser(param.getPhone());
    }

}
