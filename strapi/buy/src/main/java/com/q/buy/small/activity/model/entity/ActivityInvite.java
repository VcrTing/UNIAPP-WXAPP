package com.q.buy.small.activity.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@TableName("evt_activity_invite")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityInvite {
    @TableId
    String documentId;
    Date createTime;
    String updateBy;
    @TableLogic
    Integer deleted;

    String publisherId;
    String inviteUserId;
    String activityId;
    Integer readNum;
    Integer agreeStatus;
}
