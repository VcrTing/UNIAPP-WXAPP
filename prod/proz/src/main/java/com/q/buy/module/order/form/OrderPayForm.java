package com.q.buy.module.order.form;

import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderPayForm {
    Long id;
    String documentId;
    Integer version;

    Integer num;
    BigDecimal price;

    // 下单用户
    String userCode;
    String userPhone;
    String userDocumentId;

    // 微信支付的东西

    public void checkData() {
        if (QVUtil.notLen(QVUtil.serStr(version))) {
            throw new RuntimeException("NO");
        }
        if (QVUtil.notLen(QVUtil.serStr(documentId))) {
            throw new RuntimeException("NO");
        }
        if (QVUtil.notLen(QVUtil.serStr(userPhone))) {
            throw new RuntimeException("NO");
        }
    }
}
