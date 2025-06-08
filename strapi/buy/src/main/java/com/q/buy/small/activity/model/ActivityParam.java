package com.q.buy.small.activity.model;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.q.buy.small.activity.model.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityParam {
    List<Long> tags;
    String city;
    Integer dataStatus;

    int page;
    int pageSize;

    public LambdaQueryWrapper<Activity> queryWrapper()  {
        LambdaQueryWrapper<Activity> queryWrapper = new LambdaQueryWrapper<>();
        if (tags != null) {
        }
        return queryWrapper;
    }
}
