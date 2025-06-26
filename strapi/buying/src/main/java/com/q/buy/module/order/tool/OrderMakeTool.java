package com.q.buy.module.order.tool;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.q.buy.module.order.form.OrderMakeForm;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.small.auth.model.entity.XUser;
import com.q.buy.small.auth.service.XUserServiceImpl;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
public class OrderMakeTool {
    @Autowired
    XUserServiceImpl userService;
    @Autowired
    OrderServiceImpl orderService;

    final Object lock = new Object();

    public XUser makeChecking(XOrder xOrder) {
        if (xOrder == null) { throw new RuntimeException("订单失踪"); }
        if (xOrder.getAliveStatus() != 1) { throw new RuntimeException("订单死亡"); }
        String userDocumentId = xOrder.getUserDocumentId();
        XUser user = userService.getByDocumentId(userDocumentId);
        if (user == null) { throw new RuntimeException("找不到订单用户"); }
        if (xOrder.getRefundStatus() != 0) { throw new RuntimeException("订单被退"); }
        if (xOrder.getSendStatus() != 0) { throw new RuntimeException("订单被配送"); }
        if (xOrder.getPayStatus() != 1) { throw new RuntimeException("订单未付款"); }
        return user;
    }

    // 接单
    public XOrder makeIt(OrderMakeForm form) {
        synchronized (lock) {
            String documentId = form.getDocumentId();
            XOrder xOrder = orderService.getByDocumentId(documentId);
            XUser user = makeChecking(xOrder);
            if (xOrder.getMakeStatus() == 0) {
                if (xOrder.getNum() == 0) { throw new RuntimeException("没数量做个屁"); }
                LambdaUpdateWrapper<XOrder> uw = new LambdaUpdateWrapper<>();
                uw.set(XOrder::getMakeStatus, 1);
                uw.eq(XOrder::getDocumentId, documentId);
                uw.set(XOrder::getRefundStatus, 0);
                uw.set(XOrder::getSendStatus, 0);
                uw.set(XOrder::getMakeTime, new Date());
                xOrder = orderService.baseUpdate(xOrder, uw);
            }
            else {
                throw new RuntimeException("订单正在制作。");
            }

            return xOrder;
        }
    }

    // 完成制作
    public XOrder makeFinished(OrderMakeForm form) {
        synchronized (lock) {
            String documentId = form.getDocumentId();
            XOrder xOrder = orderService.getByDocumentId(documentId);
            XUser user = makeChecking(xOrder);
            if (xOrder.getMakeStatus() != 1) { throw new RuntimeException("订单不处于制作中。"); }
            //
            if (QVUtil.notLen(xOrder.getAddress())) { throw new RuntimeException("没地址送个屁"); }
            LambdaUpdateWrapper<XOrder> uw = new LambdaUpdateWrapper<>();
            uw.eq(XOrder::getDocumentId, documentId);
            uw.set(XOrder::getMakeStatus, 2);
            uw.set(XOrder::getRefundStatus, 0);
            uw.set(XOrder::getAliveStatus, 1);
            Integer sendStatus = QVUtil.serInt(form.getIsStartSend(), 0);
            if (sendStatus == 1) {
                uw.set(XOrder::getSendStatus, 1);
            }
            uw.set(XOrder::getSendStartTime, new Date());
            xOrder = orderService.baseUpdate(xOrder, uw);
            return xOrder;
        }
    }
}
