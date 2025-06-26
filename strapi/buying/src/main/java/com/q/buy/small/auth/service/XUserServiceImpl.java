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
            return userList.get(0);
        }
        else {
            XUser user = new XUser();
            Long id = snow.nextId();
            user.setId(id);
            user.setPhone(phone);
            user.setCountryCode(countryCode);
            user.setDocumentId(QVUtil.serStr(id));
            user.setSmallAppOpenId(openId);
            user.setSmallAppAuthCode(code);
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());
            user.setIsFreezing(0);
            if (!this.save(user)) {
                this.save(user);
            }
            return user;
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
            user.setIsFreezing(0);
            user.setId(id);
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
    public XUser hasUser(XUserInfoWxParam param) {
        List<XUser> userList = this.phone(param.getPhone());
        if (QListUtil.isBadList(userList)) {
            return null;
        }
        return userList.get(0);
    }

}
