package com.q.buy.module.order.mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderLockMapper extends BaseMapper<XOrderLock> {

}
