package com.q.buy.module.user.param.info;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.q.buy.module.user.model.entity.UpUser;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpUserInfoWxParam {
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

    public LambdaQueryWrapper<UpUser> wrapper() {
        LambdaQueryWrapper<UpUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UpUser::getPhone, phone);
        wrapper.eq(UpUser::getCountryCode, countryCode);
        return wrapper;
    }
}
