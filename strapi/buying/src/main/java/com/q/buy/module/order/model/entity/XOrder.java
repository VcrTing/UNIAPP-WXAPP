package com.q.buy.module.order.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@TableName("x_order")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class XOrder {
    @TableId(type = IdType.INPUT) // (type = IdType.AUTO)
    Long id;
    String documentId;
    Date createdAt;
    Date updatedAt;
    String updatedBy;
    String createdBy;
    @TableLogic
    Integer deleted;
    Integer version;

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

    // 0 - 等待制作， 1 - 制作完成
    Integer makeStatus;
    // 0 - 等待支付， 1 - 支付完成
    Integer payStatus;
    // 0 - 无， 1 - 配送中/已放到自提点， 2 - 配送完成/自提完成
    Integer sendStatus;

    // 各种时间
    Date orderTime;
    Date makeTime;
    Date payTime;
    Date finishTime;
    Date sendStartTime;
    Date sendEndTime;

    // 购买产品的详情
    String productsJson;

    // 下单用户
    String userCode;
    String userPhone;
    String userDocumentId;

    // 对接微信支付的数据

    // 退款数据
    String refundReason;
    String refundRemark;
    Integer refundStatus;
    BigDecimal refundPrice;

    // 存货
    Integer aliveStatus;

    String sendFinishedRemark;
}
