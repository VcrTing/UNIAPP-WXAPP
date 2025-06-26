package com.q.buy.module.order.tool;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.q.buy.module.order.form.OrderSendForm;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class OrderSendTool {
    @Autowired
    XUserServiceImpl userService;
    @Autowired
    OrderServiceImpl orderService;

    final Object lock = new Object();

    public XUser checking(XOrder xOrder) {
        if (xOrder == null) { throw new RuntimeException("订单失踪"); }
        if (xOrder.getAliveStatus() != 1) { throw new RuntimeException("订单死亡"); }
        String userDocumentId = xOrder.getUserDocumentId();
        XUser user = userService.getByDocumentId(userDocumentId);
        if (user == null) { throw new RuntimeException("找不到订单用户"); }
        if (xOrder.getRefundStatus() != 0) { throw new RuntimeException("订单被退"); }
        if (xOrder.getMakeStatus() != 2) { throw new RuntimeException("订单没完成制作"); }
        if (xOrder.getPayStatus() != 1) { throw new RuntimeException("订单未付款"); }
        return user;
    }

    // 完成制作
    public XOrder sendFinished(OrderSendForm form) {
        synchronized (lock) {
            String documentId = form.getDocumentId();
            XOrder xOrder = orderService.getByDocumentId(documentId);
            XUser user = checking(xOrder);
            if (xOrder.getSendStatus() != 1) { throw new RuntimeException("订单不处于配送中。"); }
            //
            if (QVUtil.notLen(xOrder.getAddress())) { throw new RuntimeException("没地址送个屁"); }
            LambdaUpdateWrapper<XOrder> uw = new LambdaUpdateWrapper<>();
            uw.eq(XOrder::getDocumentId, documentId);
            uw.set(XOrder::getMakeStatus, 2);
            uw.set(XOrder::getRefundStatus, 0);
            uw.set(XOrder::getAliveStatus, 1);
            uw.set(XOrder::getSendStatus, 2);
            uw.set(XOrder::getSendEndTime, new Date());
            xOrder = orderService.baseUpdate(xOrder, uw);
            return xOrder;
        }
    }
}
