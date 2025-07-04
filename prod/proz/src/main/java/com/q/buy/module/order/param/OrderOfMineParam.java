package com.q.buy.module.order.param;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderOfMineParam {

    String userDocumentId;

    Integer page;
    Integer pageSize;

    public void checkPager() {
        page = QVUtil.serInt(page, 1);
        pageSize = QVUtil.serInt(pageSize, 100);
    }

    public void checkData() {
        if (QVUtil.notLen(userDocumentId)) {
            throw new QException("用户文档 ID 错误");
        }
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
        wrapper.orderByDesc(XOrder::getCreatedAt);
        return wrapper;
    }
}
