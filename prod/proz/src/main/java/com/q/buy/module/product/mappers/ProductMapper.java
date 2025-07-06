package com.q.buy.module.product.mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.product.model.entity.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {

}
