package com.q.buy.small.activity.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.*;

@TableName("evt_activity_join")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityJoin {
    @TableId
    String documentId;
    Date createTime;
    String updateBy;
    @TableLogic
    Integer deleted;

    Integer dataStatus;

    String activityId;
    String userId;

    Integer num;
    BigDecimal feeAmount;
    Integer paymentStatus;

    Date joinTime;
}
