package com.q.buy.module.user.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.module.user.mappers.UpUserMapper;
import com.q.buy.module.user.model.entity.UpUser;
import com.q.buy.module.user.param.info.UpUserInfoWxParam;
import com.q.buy.util.q.QListUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UpUserInfoServiceImpl extends ServiceImpl<UpUserMapper, UpUser> {

    // 微信获取用户数据
    public UpUser hasUser(UpUserInfoWxParam param) {
        List<UpUser> userList = this.list(param.wrapper());
        if (QListUtil.isBadList(userList)) {
            return null;
        }
        return userList.get(0);
    }
}
