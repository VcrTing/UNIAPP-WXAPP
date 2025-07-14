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
        wrapper.in(Product::getDocumentId, idList);
        wrapper.orderByAsc(Product::getId);
        return list(wrapper);
    }

    public List<Product> getByIdsForOrder(List<String> idList) {
        if (QListUtil.isBadList(idList)) { throw new QException("PIDs = null."); }
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(Product::getDocumentId, idList);
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
        // 新库存数量
        Integer invWeak = product.getInvWeak();
        // 加热度
        product.setNumHot(QVUtil.serInt(product.getNumHot(), 0) + 1);
        product.setNumSell(QVUtil.serInt(product.getNumSell(), 0) + 1);
        product.setNumSellTrue(QVUtil.serInt(product.getNumSellTrue(), 0) + 1);
        if (invWeak <= 0) {
            // 下架产品
            product.setDataStatus(4);
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
                if (QListUtil.isBadList(productList)) { throw new QException("PRODUCT = null."); }
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

    // 增加一个库存，并且重新上架
    @Transactional(rollbackFor = Exception.class)
    public boolean returnInvWhenOrder(List<String> productIdList, String k) {
        try {
            if (KeyLock.lock(k)) {
                List<Product> productList = getByIdsForOrder(productIdList);
                if (QListUtil.isBadList(productList)) { return false; }
                for (Product p : productList) {
                    Integer invTyped = p.getInv();
                    Integer invWeak = p.getInvWeak();
                    // 额外操作
                    Integer ds = p.getDataStatus();
                    if (ds == 4) {
                        // 重新上架
                        p.setDataStatus(2);
                        // 扣除库存
                        if (invWeak <= 0) {
                            if (invTyped == 2) {
                                p.setInvWeak(1);
                                p.setInv(1);
                            }
                            else {
                                p.setInvWeak(invWeak + 1);
                                p.setInv(p.getInv() + 1);
                            }
                        }
                        p.setNumSellTrue(QVUtil.costInt(QVUtil.serInt(p.getNumSellTrue(), 0), 1));

                        //
                        if (!this.updateById(p)) {
                            // return false;
                            throw new QException("回返产品库存时，数据库波动，请重试。");
                        }
                    }
                }
                return true;
            }
            else {
                return false;
                // throw new QException("订单已在锁状态。");
            }
        }
        catch (Exception e) {
            // return false;
            throw new QException(e.getMessage());
        }
        finally {
            KeyLock.unLock(k);
        }
    }
}
