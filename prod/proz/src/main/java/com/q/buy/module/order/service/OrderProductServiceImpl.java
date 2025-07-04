package com.q.buy.module.order.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.framework.constant.DevConstant;
import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.mappers.OrderMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import com.q.buy.module.order.model.vo.VoXOrder;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class OrderProductServiceImpl extends ServiceImpl<OrderMapper, XOrder> {

    public List<XOrder> getByUserDocumentId(String userDocumentId) {
        LambdaUpdateWrapper<XOrder> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(XOrder::getUserDocumentId, userDocumentId);
        wrapper.eq(XOrder::getAliveStatus, 1);
        wrapper.eq(XOrder::getHasLock, 1);
        wrapper.eq(XOrder::getPayStatus, 1);
        return list(wrapper);
    }
    //
    public List<String> getAllProductList(String userDocumentId) {
        List<String> list = new ArrayList<String>();
        List<XOrder> orderList = getByUserDocumentId(userDocumentId);
        // 组合出产品 ID
        for (XOrder order : orderList) {
            List<Map<String, Object>> carts = VoXOrder.getCarts(order);
            for (Map<String, Object> map : carts) {
                list.add(QVUtil.serStr(map.get(DevConstant.K_DOC_ID)));
            }
        }
        //
        return list;
    }
}
