package com.q.buy.module.order.tool;

import cn.hutool.json.JSONUtil;
import com.q.buy.module.order.form.cart.OrderShoppingCart;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.vo.VoXOrder;
import com.q.buy.module.order.service.OrderLockServiceImpl;
import com.q.buy.module.order.service.OrderServiceImpl;
import com.q.buy.module.product.service.ProductServiceImpl;
import com.q.buy.util.q.QListUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class OrderExpireTool {

    @Autowired
    ProductServiceImpl productService;
    @Autowired
    OrderServiceImpl orderService;
    @Autowired
    OrderLockServiceImpl orderLockService;

    @Transactional
    public List<XOrder> expireAnyOrder() {
        List<XOrder> finishList = new ArrayList<>();
        //
        List<XOrder> orders = orderService.searchForExpire();
        if (QListUtil.isNiceList(orders)) {
            log.info("要取消的订单 =" + JSONUtil.toJsonStr(orders));
        }
        if (QListUtil.isNiceList(orders)) {
            // List<VoXOrder> voList = VoXOrder.initList(orders);
            for (XOrder order : orders) {
                //
                boolean src = productService.returnInvWhenOrder(
                        OrderShoppingCart.getProductIdList(VoXOrder.getCarts(order)),
                        order.getDocumentId()
                );
                if (src) {
                    finishList.add(order);
                    // 改状态
                    orderService.cancelOrder(order);
                    // 消退锁
                    orderLockService.finished(order);
                }
            }
        }
        //
        return finishList;
    }
}
