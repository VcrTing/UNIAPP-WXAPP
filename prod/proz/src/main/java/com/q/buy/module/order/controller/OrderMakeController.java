package com.q.buy.module.order.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.framework.result.HResultStrapi;
import com.q.buy.module.order.form.OrderAddForm;
import com.q.buy.module.order.form.OrderMakeForm;
import com.q.buy.module.order.form.OrderPayForm;
import com.q.buy.module.order.mappers.OrderMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.vo.VoXOrder;
import com.q.buy.module.order.model.vo.VoXOrderWhenCheckout;
import com.q.buy.module.order.param.OrderQueryParam;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.module.order.tool.CheckOutTool;
import com.q.buy.module.order.tool.OrderMakeTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "order/make")
public class OrderMakeController {

    @Autowired
    OrderServiceImpl orderService;

    // version 严格控制
    // 0 = waiting, 1 = making, 2 = finished
    // 其他时候就任意了。

    @Autowired
    CheckOutTool checkOutTool;
    // 新建订单
    @PostMapping("ma")
    public HResult<XOrder> add(@RequestBody OrderAddForm form) {
        try {
            return HResult.ok( checkOutTool.addOrder(form) );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }
    // 需要制作的
    @GetMapping("/waiting")
    public HResultStrapi<VoXOrder> waiting(OrderQueryParam param) {
        param.checkPager();
        IPage<XOrder> o = orderService.getMakeWaiting(param.getPage(), param.getPageSize());
        return HResultStrapi.ok( VoXOrder.initOfPager( o ) );
    }
    // 制作中的
    @GetMapping("/making")
    public HResultStrapi<VoXOrder> making(OrderQueryParam param) {
        param.checkPager();
        IPage<XOrder> o = orderService.getMaking(param.getPage(), param.getPageSize());
        return HResultStrapi.ok( VoXOrder.initOfPager( o ) );
    }

    @Autowired
    OrderMakeTool makeTool;
    // 制作它
    @PostMapping("/make-it")
    public HResult<XOrder> makeIt(@RequestBody OrderMakeForm form) {
        try {
            XOrder xOrder = makeTool.makeIt(form);
            return HResult.ok( xOrder );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }
    // make-finished
    @PostMapping("/make-finished")
    public HResult<XOrder> makeFinished(@RequestBody OrderMakeForm form) {
        try {
            XOrder xOrder = makeTool.makeFinished(form);
            return HResult.ok( xOrder );
        }
        catch (Exception e) { e.printStackTrace(); return HResult.error(e.getMessage()); }
    }
}
