package com.q.buy.small.activity.mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.q.buy.small.activity.model.entity.Activity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ActivityMapper extends BaseMapper<Activity> {
}

/*
根据 tags id 进行查询
SELECT m.id,m.title, d.url from evt_activity m
LEFT JOIN
evt_activity_media d on d.activity_id = m.id
WHERE
m.id in (
select b.activity_id from evt_activity_tag_relation b where
b.tag_id in (1,2)
)
 */
