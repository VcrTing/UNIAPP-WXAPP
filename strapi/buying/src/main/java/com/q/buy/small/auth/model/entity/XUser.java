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

    String nickname;
    Integer gender;
    String phone;
    Integer countryCode;

    String smallAppAvatar;
    String smallAppAuthCode;
    String smallAppOpenId;
    String smallAppIv;
    String smallAppEncryptedData;

    Integer isFreezing;
}
