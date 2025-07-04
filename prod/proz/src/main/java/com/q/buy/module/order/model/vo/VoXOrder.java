package com.q.buy.module.order.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.q.buy.module.order.model.entity.XOrder;
import com.q.buy.util.q.QBeanUtil;
import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoXOrder {

    String documentId;
    Date createdAt;
    Date updatedAt;
    String updatedBy;
    String createdBy;

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
    List<Map<String, Object>> carts;

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

    public static List<Map<String, Object>> getCarts(XOrder order) {
        if (StringUtils.hasLength(order.getCartsJson())) {
            List<Map> carts = JSONUtil.toList(order.getCartsJson(), Map.class);
            return QVUtil.objToListMap(carts);
        }
        return null;
    }

    public static IPage<VoXOrder> initOfPager(IPage<XOrder> page) {
        List<XOrder> srcList = page.getRecords();
        List<VoXOrder> resList = initList(srcList);
        return QVUtil.changeIPage(page, resList);
    }

    public static List<VoXOrder> initList(List<XOrder> srcList) {
        List<VoXOrder> res = new ArrayList<>();
        for (XOrder order : srcList) {
            VoXOrder one = QBeanUtil.convert(order, VoXOrder.class);
            one.setCarts(getCarts(order));
            res.add(one);
        }
        return res;
    }
}
