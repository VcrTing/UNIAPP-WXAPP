package com.q.buy.module.order.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.mappers.OrderLockMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class OrderLockServiceImpl extends ServiceImpl<OrderLockMapper, XOrderLock> {

    final Integer STS_FINISHED_YES = 1;

    // add
    public XOrderLock add(XOrder order) {
        XOrderLock old = this.getNow(order.getUserDocumentId());
        if (old != null) {
            return null;
        }
        XOrderLock n = new XOrderLock();
        n.setUserDocumentId(order.getUserDocumentId());
        n.setOrderDocumentId(order.getDocumentId());
        n.setFinishedStatus(0);
        n.setVersion(0);
        n.setCreatedAt(new Date());
        if (!this.save(n)) {
            throw new QException("数据库波动");
        }
        return n;
    }

    // now
    public XOrderLock getNow(String userDocumentId) {
        LambdaQueryWrapper<XOrderLock> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrderLock::getUserDocumentId, userDocumentId);
        wrapper.ne(XOrderLock::getFinishedStatus, STS_FINISHED_YES);
        // wrapper.eq(XOrderLock::getOrderDocumentId, orderDocumentId);
        List<XOrderLock> list = list(wrapper);
        return QListUtil.first(list);
    }
    // finished
    @Transactional
    public XOrderLock finished(XOrderLock orderLock) {
        orderLock.setFinishedStatus(STS_FINISHED_YES);
        if (!this.updateById(orderLock)) {
            throw new QException("修改锁时，数据库波动。这订单可能废了。");
        }
        return orderLock;
    }

    @Transactional
    public XOrder finished(XOrder order) {
        LambdaUpdateWrapper<XOrderLock> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(XOrderLock::getUserDocumentId, order.getUserDocumentId());
        wrapper.eq(XOrderLock::getOrderDocumentId, order.getDocumentId());

        wrapper.set(XOrderLock::getFinishedStatus, STS_FINISHED_YES);
        if (!this.update(wrapper)) {
            throw new QException("修改锁时，数据库波动。这订单可能废了。");
        }
        return order;
    }

    //
}
