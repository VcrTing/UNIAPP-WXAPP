package com.q.buy.module.order.form;

import cn.hutool.json.JSONUtil;
import com.q.buy.module.order.form.cart.OrderShoppingCart;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.util.q.QDateUtil;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddForm {

    // 配送消息
    BigDecimal longitude;
    BigDecimal latitude;
    String address;
    String phone;
    String name;
    // 0 - 配送类型
    Integer sendType;
    //
    String remark;
    // 订单价格
    BigDecimal price;
    // 配送费
    BigDecimal sendPrice;
    Integer num;
    // 各种时间
    // 购买产品的详情
    List<OrderShoppingCart> carts;
    // 下单用户
    String userCode;
    String userPhone;
    String userDocumentId;

    Map<String, Object> user;

    // 化为新增
    public XOrder toXOrder() {
        XOrder xOrder = new XOrder();

        if (QListUtil.isBadList(carts)) {
            throw new RuntimeException("没有任何商品");
        }
        if (QVUtil.notLen(userDocumentId)) {
            throw new RuntimeException("检测到未关联到用户");
        }
        /*
        if (QVUtil.notLen(address)) {
            throw new RuntimeException("没有送货地址");
        }
        */
        if (QVUtil.notLen(phone)) {
            throw new RuntimeException("没有电话送个屁单");
        }
        if (QVUtil.notLen(userPhone)) {
            throw new RuntimeException("没有用户送个屁单");
        }
        if (price == null) {
            throw new RuntimeException("价格 = 空，逆天了。");
        }
        if (num == null) {
            throw new RuntimeException("数量 = 0，啥都没有吗？");
        }

        if (user == null) {
            throw new RuntimeException("用户 = 0，啥都没有吗？");
        }

        //
        for (OrderShoppingCart cart : carts) {
            cart.checkData();
        }

        xOrder.setLongitude(longitude);
        xOrder.setLatitude(latitude);
        xOrder.setAddress(address);
        xOrder.setPhone(phone);
        xOrder.setName(name);
        xOrder.setSendType(sendType);
        xOrder.setRemark(remark);
        xOrder.setPrice(price);
        xOrder.setSendPrice(sendPrice);
        xOrder.setNum(num);
        //
        xOrder.setCartsJson(
                JSONUtil.toJsonStr(carts)
        );
        xOrder.setUserCode(userCode);
        xOrder.setUserPhone(QVUtil.serStr(userPhone));
        xOrder.setUserDocumentId(userDocumentId);

        //
        xOrder.setCreatedBy(QVUtil.serStr(userPhone));
        xOrder.setCreatedAt(new Date());
        xOrder.setUpdatedAt(new Date());
        xOrder.setDeleted(0);
        xOrder.setVersion(0);
        //
        xOrder.setMakeStatus(0);
        xOrder.setPayStatus(0);
        xOrder.setSendStatus(0);
        xOrder.setAliveStatus(1);
        xOrder.setRefundStatus(0);
        //
        xOrder.setUserJson(JSONUtil.toJsonStr(user));

        StringBuilder sb = new StringBuilder();
        // 构建搜索
        sb.append("USER_").append(userDocumentId);
        sb.append("PHONE_").append(phone);
        if (carts != null) {
            for (OrderShoppingCart cart : carts) {
                sb.append("PRODUCT_").append(cart.getDocumentId());
            }
        }
        xOrder.setSearch(sb.toString());
        return xOrder;
    }

    public XOrder insertOrderExpired(XOrder xOrder) {
        xOrder.setExpireStatus(0);
        xOrder.setExpireTime(QDateUtil.nowAddMinute(XOrder.ORDER_EXPIRE_MINUTE));
        return xOrder;
    }
}
