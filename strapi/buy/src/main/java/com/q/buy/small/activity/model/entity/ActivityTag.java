package com.q.buy.small.activity.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@TableName("evt_activity_tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityTag {
    @TableId
    String documentId;
    Date createTime;
    String updateBy;
    @TableLogic
    Integer deleted;

    Integer dataStatus;
    String name;
    String search;
    Integer handsome;
    String cover;
}
