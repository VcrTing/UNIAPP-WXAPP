package com.q.buy.small.auth.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@TableName("x_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class XUser {
    @TableId(type = IdType.INPUT)
    Long id;
    String documentId;
    Date createdAt;
    Date updatedAt;

    String username;
    String email;

    String socialAccount;
    String introduction;
    String background;
    String avatarUrl;
    String nickName;
    Integer gender;
    Integer age;
    String phone;
    Integer countryCode;

    String smallAppAvatar;
    String smallAppAuthCode;
    String smallAppOpenId;
    String smallAppIv;
    String smallAppEncryptedData;

    Integer isFreezing;
    String password;

    public String generateRegisterPassword() {
        StringBuffer sb = new StringBuffer();
        sb.append(countryCode).append("_");
        sb.append(phone).append("_");
        sb.append("VCR_TING");
        return sb.toString();
    }

    public String generateEmail() {
        StringBuffer sb = new StringBuffer();
        sb.append(phone);
        sb.append("@163.com");
        return sb.toString();
    }

    public void keepSecurity() {
        this.password = "";
        this.smallAppEncryptedData = "";
    }
}
