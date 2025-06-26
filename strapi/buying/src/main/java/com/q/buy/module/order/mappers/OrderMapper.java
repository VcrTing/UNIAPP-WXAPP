package com.q.buy.module.order.mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.q.buy.module.order.model.entity.XOrder;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderMapper extends BaseMapper<XOrder> {

}
