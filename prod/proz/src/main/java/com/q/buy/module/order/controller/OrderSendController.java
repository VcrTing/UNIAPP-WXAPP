package com.q.buy.module.order.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.framework.result.HResultStrapi;
import com.q.buy.module.order.form.OrderAddForm;
import com.q.buy.module.order.form.OrderMakeForm;
import com.q.buy.module.order.form.OrderSendForm;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.vo.VoXOrder;
import com.q.buy.module.order.param.OrderQueryParam;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.module.order.tool.CheckOutTool;
import com.q.buy.module.order.tool.OrderMakeTool;
import com.q.buy.module.order.tool.OrderSendTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "order/send")
public class OrderSendController {

    @Autowired
    OrderServiceImpl orderService;

    // version 严格控制
    // 0 = waiting, 1 = sending, 2 = finished, 3 = error
    // 其他时候就任意了。

    // api/order/send/sending
    @GetMapping("/sending")
    public HResultStrapi<VoXOrder> sending(OrderQueryParam param) {
        param.checkPager();
        IPage<XOrder> o = orderService.getSending(param.getPage(), param.getPageSize());
        return HResultStrapi.ok( VoXOrder.initOfPager( o ) );
    }

    @Autowired
    OrderSendTool sendTool;

    // send-finished
    @PostMapping("/send-finished")
    public HResult<XOrder> sendFinished(@RequestBody OrderSendForm form) {
        try {
            XOrder xOrder = sendTool.sendFinished(form);
            return HResult.ok( xOrder );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }
}
