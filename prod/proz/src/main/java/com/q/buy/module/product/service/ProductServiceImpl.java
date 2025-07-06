package com.q.buy.module.product.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.common.lock.KeyLock;
import com.q.buy.framework.exception.QException;
import com.q.buy.module.order.mappers.OrderMapper;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.module.order.model.entity.XOrderLock;
import com.q.buy.module.product.mappers.ProductMapper;
import com.q.buy.module.product.model.entity.Product;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> {

    // 获取产品
    public List<Product> getByIds(List<String> idList) {
        if (QListUtil.isBadList(idList)) { throw new QException("PIDs = null."); }
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(Product::getId, idList);
        wrapper.orderByAsc(Product::getId);
        return list(wrapper);
    }

    public List<Product> getByIdsForOrder(List<String> idList) {
        if (QListUtil.isBadList(idList)) { throw new QException("PIDs = null."); }
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(Product::getId, idList);
        wrapper.orderByAsc(Product::getId);
        return list(wrapper);
    }

    // 检测虚拟库存
    public boolean enoughInv(List<Product> product) {
        for (Product p : product) {
            Integer inv = p.getInv();
            Integer invWeak = p.getInvWeak();
            if (invWeak <= 0 || inv <= 0) {
                throw new QException(p.getTitle() + " 库存不足，为 0。");
            }
        }
        return true;
    }

    // 额外动作
    @Transactional(rollbackFor = Exception.class)
    public Product costInvAnotherAction(Product product) {
        Integer invTyped = product.getInvTyped();
        // 新库存数量
        Integer invWeak = product.getInvWeak();
        // 一件库存
        if (invTyped == 2) {
            if (invWeak <= 0) {
                // 下架产品
                product.setDataStatus(4);
            }
        }
        // 多数库存
        else if (invTyped == 1) {
            if (invWeak <= 0) {
                // 下架产品
                product.setDataStatus(4);
            }
        }
        // 无限库存
        else {

        }
        return product;
    }

    final Object costLock = new Object();
    // 减一虚拟库存
    @Transactional(rollbackFor = Exception.class)
    public boolean costInvWhenOrder(List<String> productIdList, String k) {
        try {
            if (KeyLock.lock(k)) {
                List<Product> productList = getByIdsForOrder(productIdList);
                enoughInv(productList);
                for (Product p : productList) {
                    Integer invWeak = p.getInvWeak();
                    p.setInvWeak(invWeak - 1);
                    p.setInv(p.getInv() - 1);

                    // 额外操作
                    p = costInvAnotherAction(p);

                    if (!this.updateById(p)) {
                        throw new QException("修改产品库存时，数据库波动，请重试。");
                    }
                }
                return true;
            }
            else {
                throw new QException("订单已在锁状态。");
            }
        }
        catch (Exception e) { throw new QException(e.getMessage()); }
        finally {
            KeyLock.unLock(k);
        }
    }
}
