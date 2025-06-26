package com.q.buy.module.order.controller;


import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.module.order.form.OrderAddForm;
import com.q.buy.module.order.form.OrderPayForm;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.vo.VoXOrderWhenCheckout;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.module.order.tool.CheckOutTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "order/checkout")
public class CheckOutController {

    @Autowired
    OrderServiceImpl orderService;

    // version 严格控制
    // 0 = add, 1 = pay
    // 其他时候就任意了。

    @Autowired
    CheckOutTool checkOutTool;
    // 新建订单
    @PostMapping("add")
    public HResult<XOrder> add(@RequestBody OrderAddForm form) {
        try {
            return HResult.ok( checkOutTool.addOrder(form) );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }

    // 新建订单
    @PostMapping("pay")
    public HResult<VoXOrderWhenCheckout> pay(@RequestBody OrderPayForm form) {
        try {
            return HResult.ok( VoXOrderWhenCheckout.init( checkOutTool.payment(form) ) );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }

}
