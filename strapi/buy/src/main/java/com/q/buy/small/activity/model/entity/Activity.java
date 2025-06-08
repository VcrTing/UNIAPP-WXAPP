package com.q.buy.small.activity.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.*;

@TableName("evt_activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @TableId
    String documentId;
    Date createTime;
    String updateBy;
    @TableLogic
    Integer deleted;

    String title;
    String introduction;
    Integer typed;
    Date startTime;
    Date endTime;
    Integer joinLimit;
    BigDecimal fee;
    Integer dataStatus;
    Integer reviewStatus;
    Integer reviewComment;
    Integer viewCount;
    Integer shareCount;

    Integer recommendLevel;

    String publisherId;
    String addressId;

    BigDecimal longitude;
    BigDecimal latitude;
    String city;
    String area;
    String address;

    Integer agree;
}
