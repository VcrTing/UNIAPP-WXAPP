package com.q.buy.module.order.form.cart;

import com.q.buy.framework.exception.QException;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderShoppingCart {
    String documentId; // product doc id
    List<Map<String, Object>> prices;
    Map<String, Object> product;

    public void checkData() {
        if (QListUtil.isBadList(prices)) {
            throw new QException("未有任何价格信息。");
        }
        if (product == null) {
            throw new QException("未有任何产品信息。");
        }
        if (QVUtil.notLen(documentId)) {
            throw new QException("为找到产品 DOC ID。");
        }
    }

    public static List<String> getProductIdList(List<OrderShoppingCart> carts) {
        if (QListUtil.isBadList(carts)) { return null; }
        List<String> productIdList = new ArrayList<>();
        for (OrderShoppingCart cart : carts) {
            productIdList.add(cart.getDocumentId());
        }
        return productIdList;
    }
}
