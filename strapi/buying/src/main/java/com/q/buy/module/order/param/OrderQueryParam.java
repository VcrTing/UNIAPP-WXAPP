package com.q.buy.module.order.param;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderQueryParam {

    String userDocumentId;

    Integer makeStatus;
    Integer payStatus;
    Integer sendStatus;
    Integer refundStatus;

    Integer page;
    Integer pageSize;

    public void checkPager() {
        page = QVUtil.serInt(page, 1);
        pageSize = QVUtil.serInt(pageSize, 100);
    }

    public IPage<XOrder> ipage() {
        this.checkPager();
        return new Page<XOrder>(page, pageSize);
    }

    public LambdaQueryWrapper<XOrder> wrapper() {
        LambdaQueryWrapper<XOrder> wrapper = new LambdaQueryWrapper<>();
        if (QVUtil.hasLen(userDocumentId)) {
            wrapper.eq(XOrder::getUserDocumentId, userDocumentId);
        }
        if (QVUtil.serInt(makeStatus, -1) != -1) {
            wrapper.eq(XOrder::getMakeStatus, makeStatus);
        }
        if (QVUtil.serInt(payStatus, -1) != -1) {
            wrapper.eq(XOrder::getPayStatus, payStatus);
        }
        if (QVUtil.serInt(sendStatus, -1) != -1) {
            wrapper.eq(XOrder::getSendStatus, sendStatus);
        }
        if (QVUtil.serInt(refundStatus, -1) != -1) {
            wrapper.eq(XOrder::getRefundStatus, refundStatus);
        }
        wrapper.orderByDesc(XOrder::getCreatedAt);
        return wrapper;
    }
}
