package com.q.buy.module.order.tool;

import com.q.buy.module.order.form.OrderAddForm;
import com.q.buy.module.order.form.OrderPayForm;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.util.database.SnowflakeIdWorker;
import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class CheckOutTool {

    @Autowired
    OrderServiceImpl orderService;

    SnowflakeIdWorker snow = new SnowflakeIdWorker( 0,0);

    final Object addLock = new Object();
    // 新增订单
    public XOrder addOrder(OrderAddForm form) {
        synchronized (addLock) {
            XOrder order = form.toXOrder();
            Long orderId = snow.nextId();
            order.setId(orderId);
            order.setDocumentId(QVUtil.serStr(orderId));
            boolean isOK = orderService.save(order);
            if (!isOK) {
                throw new RuntimeException("新增订单失败，请重新提交。");
            }
            return order;
        }
    }

    final Object checkoutLock = new Object();
    // 支付
    public XOrder payment(OrderPayForm form) {
        XOrder xOrder = null;
        synchronized (checkoutLock) {
            xOrder = orderService.getByDocumentId(form.getDocumentId());
            System.out.println(xOrder);
            // 状态检查
            if (xOrder == null) {
                throw new RuntimeException("订单不见了。");
            }
            if (QVUtil.serInt(xOrder.getMakeStatus(), 0) != 0) {
                throw new RuntimeException("订单状态制作中。");
            }
            if (QVUtil.serInt(xOrder.getPayStatus(), 0) != 0) {
                throw new RuntimeException("订单状态不是未支付。");
            }
            if (QVUtil.serInt(xOrder.getSendStatus(), 0) != 0) {
                throw new RuntimeException("订单状态不是待配送。");
            }
            // 东西检查
            String orderPhone = QVUtil.serStr(xOrder.getUserPhone());
            String userPhone = QVUtil.serStr(form.getUserPhone());
            if (!orderPhone.equals(userPhone)) {
                throw new RuntimeException("下单用户不匹配。");
            }
            // 乐观锁
            if (QVUtil.serInt(xOrder.getVersion(), -1) != 0) {
                throw new RuntimeException("支付时的订单 乐观锁 不为 0");
            }
            if (QVUtil.serInt(form.getVersion(), -1) != 0) {
                throw new RuntimeException("传递的订单 乐观锁 失效");
            }

            // 检查通过
            xOrder.setUpdatedAt(new Date());
            xOrder.setMakeStatus(0);
            xOrder.setSendStatus(0);
            xOrder.setRefundStatus(0);
            xOrder.setPayStatus(1);
            xOrder.setAliveStatus(1);
            xOrder.setPayTime(new Date());
            xOrder.setVersion(QVUtil.serInt(xOrder.getVersion(), 0) + 1);
            //
            boolean isOK = orderService.updateById(xOrder);
            if (!isOK) { throw new RuntimeException("订单付款存数据库失败。"); }
        }
        // 发送消息
        return xOrder;
    }
}
