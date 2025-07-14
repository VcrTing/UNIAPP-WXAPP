package com.q.buy.module.order.tool;

import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.form.OrderAddForm;
import com.q.buy.module.order.form.OrderPayForm;
import com.q.buy.module.order.form.cart.OrderShoppingCart;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import com.q.buy.module.order.service.OrderLockServiceImpl;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.module.product.service.ProductServiceImpl;
import com.q.buy.util.database.SnowflakeIdWorker;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
public class CheckOutTool {

    @Autowired
    OrderServiceImpl orderService;
    @Autowired
    OrderLockServiceImpl orderLockService;

    @Autowired
    ProductServiceImpl productService;

    SnowflakeIdWorker snow = new SnowflakeIdWorker( 0,0);

    final Object addLock = new Object();
    // 新增订单
    @Transactional
    public XOrder addOrder(OrderAddForm form) {
        synchronized (addLock) {
            XOrder order = form.toXOrder();
            order = form.insertOrderExpired(order);
            //
            Long orderId = snow.nextId();
            order.setId(orderId);
            order.setDocumentId(QVUtil.serStr(orderId));
            order.setOrderCode(order.getDocumentId());
            // 加订单
            boolean isOK = orderService.save(order);
            if (!isOK) {
                throw new QException("新增订单失败，请重新提交。");
            }
            // 扣库存
            productService.costInvWhenOrder(OrderShoppingCart.getProductIdList(form.getCarts()), order.getDocumentId());
            // 加锁
            XOrderLock xOrderLock = orderLockService.add(order);
            if (xOrderLock != null) {
                // 加入锁
                order = orderService.addLock(order, xOrderLock);
                // 修改产品为交易状态
                //  [{label: '空白',value: ''}, {label: '未清',value: '未清'},{ label: '已确认',value: '已确认'},{ label: '已结算',value: '已结算'},{ label: '已取消',value: '已取消'}]
            }
            // 返回
            return order;
        }
    }

    final Object checkoutLock = new Object();
    // 支付
    @Transactional
    public XOrder payment(OrderPayForm form) {
        XOrder xOrder = null;
        synchronized (checkoutLock) {
            xOrder = orderService.getByDocumentId(form.getDocumentId());
            // System.out.println(xOrder);
            // 状态检查
            if (xOrder == null) {
                throw new QException("订单不见了。");
            }
            if (QVUtil.serInt(xOrder.getPayStatus(), 0) != 0) {
                throw new QException("订单状态不是未支付。");
            }
            if (QVUtil.notLen(xOrder.getUserDocumentId())) {
                throw new QException("订单找不到用户。");
            }
            /*
            if (QVUtil.serInt(xOrder.getMakeStatus(), 0) != 0) {
                throw new RuntimeException("订单状态制作中。");
            }
            if (QVUtil.serInt(xOrder.getSendStatus(), 0) != 0) {
                throw new RuntimeException("订单状态不是待配送。");
            }
            */
            // 东西检查
            String orderPhone = QVUtil.serStr(xOrder.getUserPhone());
            String userPhone = QVUtil.serStr(form.getUserPhone());
            if (!orderPhone.equals(userPhone)) {
                throw new RuntimeException("下单用户不匹配。");
            }
            // 检查锁
            XOrderLock xOrderLock = orderLockService.getNow(xOrder.getUserDocumentId());
            if (xOrderLock == null) {
                throw new QException("未找到该用户的任何订单锁。");
            }
            // System.out.println(xOrderLock.getOrderDocumentId());
            // System.out.println(xOrder.getDocumentId());
            if (!xOrderLock.getOrderDocumentId().equals(xOrder.getDocumentId())) {
                throw new QException("该订单未找到属于它的支付锁。");
            }

            // 乐观锁
            if (QVUtil.serInt(form.getVersion(), -1) != 1) {
                throw new RuntimeException("传递的订单 乐观锁 失效。");
            }
            if (QVUtil.serInt(xOrder.getVersion(), -1) != 1) {
                throw new RuntimeException("支付时的订单 乐观锁 不为 1。");
            }

            // 检查通过
            xOrder.setUpdatedAt(new Date());
            xOrder.setMakeStatus(0);
            xOrder.setSendStatus(0);
            xOrder.setRefundStatus(0);
            xOrder.setPayStatus(1);
            xOrder.setAliveStatus(1);
            xOrder.setPayTime(new Date());
            xOrder.setVersion(QVUtil.serInt(xOrder.getVersion(), 1) + 1);
            //
            boolean isOK = orderService.updateById(xOrder);
            if (!isOK) { throw new QException("订单付款存数据库失败。"); }

            // 完成锁
            orderLockService.finished(xOrderLock);

            // 解锁产品的交易状态
        }
        // 发送消息
        return xOrder;
    }
}
