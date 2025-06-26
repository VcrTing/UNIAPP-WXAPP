package com.q.buy.small.auth.param.info;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.util.q.QBeanUtil;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class XUserInfoWxParam {
    String documentId;
    String nickname;
    Integer gender;

    String smallAppAvatar;
    String smallAppAuthCode;

    String code;
    String phone;
    String countryCode;

    public void checkData() {
        if (QVUtil.notLen(code)) {
            throw new RuntimeException("参数不正确。");
        }
        if (QVUtil.notLen(phone)) {
            throw new RuntimeException("参数不正确。");
        }
        if (QVUtil.notLen(countryCode)) {
            throw new RuntimeException("参数不正确。");
        }
    }

    public LambdaQueryWrapper<XUser> wrapper() {
        LambdaQueryWrapper<XUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XUser::getPhone, phone);
        // wrapper.eq(XUser::getCountryCode, countryCode);
        return wrapper;
    }

    public XUser toEntity(XUser old) {
        if (old == null) {
            XUser user = QBeanUtil.convert(this, XUser.class);
            user.setUpdatedAt(new Date());
            return user;
        }
        else {
            old.setGender(gender);
            old.setNickname(nickname);
            old.setSmallAppAvatar(smallAppAvatar);
            old.setSmallAppAuthCode(smallAppAuthCode);
            old.setUpdatedAt(new Date());
            return old;
        }
    }
}
