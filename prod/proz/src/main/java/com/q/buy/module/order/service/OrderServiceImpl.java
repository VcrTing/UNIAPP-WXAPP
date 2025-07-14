package com.q.buy.module.order.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.form.OrderMakeForm;
import com.q.buy.module.order.mappers.OrderMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, XOrder> {

    public XOrder baseUpdate(XOrder xOrder, LambdaUpdateWrapper<XOrder> uw) {
        int vs = QVUtil.serInt(xOrder.getVersion(), 1);
        uw.set(XOrder::getVersion, vs);
        uw.set(XOrder::getUpdatedAt, new Date());
        boolean isOK = this.update(uw);
        if (!isOK) { throw new RuntimeException("数据库波动"); }
        return xOrder;
    }

    //
    public XOrder getByDocumentId(String documentId) {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrder::getDocumentId, documentId);
        List<XOrder> list = list(wrapper);
        return QListUtil.first(list);
    }

    // 获取需要制作的
    public IPage<XOrder> getMakeWaiting(Integer page, Integer paeSize) {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrder::getMakeStatus, 0);
        wrapper.eq(XOrder::getPayStatus, 1);
        wrapper.eq(XOrder::getSendStatus, 0);
        wrapper.eq(XOrder::getRefundStatus, 0);
        wrapper.eq(XOrder::getAliveStatus, 1);
        wrapper.orderByAsc(XOrder::getCreatedAt);
        return this.page(new Page<>(page, paeSize), wrapper);
    }
    // 获取正在制作的
    public IPage<XOrder> getMaking(Integer page, Integer paeSize) {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrder::getMakeStatus, 1);
        wrapper.eq(XOrder::getPayStatus, 1);
        wrapper.eq(XOrder::getSendStatus, 0);
        wrapper.eq(XOrder::getRefundStatus, 0);
        wrapper.eq(XOrder::getAliveStatus, 1);
        wrapper.orderByAsc(XOrder::getCreatedAt);
        return this.page(new Page<>(page, paeSize), wrapper);
    }


    // 获取正在制作的
    public IPage<XOrder> getSending(Integer page, Integer paeSize) {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrder::getMakeStatus, 2);
        wrapper.eq(XOrder::getPayStatus, 1);
        wrapper.eq(XOrder::getSendStatus, 1);
        wrapper.eq(XOrder::getRefundStatus, 0);
        wrapper.eq(XOrder::getAliveStatus, 1);
        wrapper.orderByAsc(XOrder::getCreatedAt);
        return this.page(new Page<>(page, paeSize), wrapper);
    }

    // 加入锁
    public XOrder addLock(XOrder xOrder, XOrderLock orderLock) {
        xOrder.setHasLock(1);
        xOrder.setOrderLockId(orderLock.getId());
        xOrder.setVersion(1);
        xOrder.setUpdatedAt(new Date());
        xOrder.setUpdatedBy("SYSTEM");
        if (!this.updateById(xOrder)) {
            throw new QException("加入锁失败。");
        }
        return xOrder;
    }

    // 搜寻过期时间
    public List<XOrder> searchForExpire() {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XOrder::getExpireStatus, 0);
        wrapper.lt(XOrder::getExpireTime, new Date());
        wrapper.orderByAsc(XOrder::getCreatedAt);
        wrapper.eq(XOrder::getPayStatus, 0);
        IPage<XOrder> page = new Page<>(1, 10);
        page = this.page(page, wrapper);
        return page.getRecords();
    }

    // 取消订单
    @Transactional(rollbackFor = Exception.class)
    public boolean cancelOrder(XOrder xOrder) {
        //
        xOrder.setExpireStatus(1);
        xOrder.setFinishTime(new Date());
        //
        // 改状态
        if (!this.updateById(xOrder)) { throw new QException("数据库波动"); }
        // 返回 正常 状态
        return true;
    }
}
