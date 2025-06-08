package com.q.buy.small.activity.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@TableName("evt_activity_address")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityAddress {
    @TableId
    String documentId;
    Date createTime;
    String updateBy;
    @TableLogic
    Integer deleted;

    BigDecimal longitude;
    BigDecimal latitude;
    String city;
    String area;
    String address;
    String remark;
}
