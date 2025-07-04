package com.q.buy.module.order.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.framework.result.HResultStrapi;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.vo.VoXOrder;
import com.q.buy.module.order.param.OrderOfMineParam;
import com.q.buy.module.order.param.OrderQueryParam;
import com.q.buy.module.order.service.OrderProductServiceImpl;
import com.q.buy.module.order.service.OrderServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "orders/products")
public class OrderProductController {

    @Autowired
    OrderProductServiceImpl orderProductService;

    // backend/orders/products/all
    @GetMapping("/all")
    public HResult<List<String>> get(OrderOfMineParam param) {
        param.checkData();
        List<String> stringList = orderProductService.getAllProductList(param.getUserDocumentId());
        return HResult.ok( stringList );
    }

}
