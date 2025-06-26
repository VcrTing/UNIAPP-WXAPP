package com.q.buy.module.order.model.vo;

import com.q.buy.module.order.model.entity.XOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoXOrderWhenCheckout {
    String documentId;

    public static VoXOrderWhenCheckout init(XOrder order) {
        VoXOrderWhenCheckout voXOrderWhenCheckout = new VoXOrderWhenCheckout();
        voXOrderWhenCheckout.setDocumentId(order.getDocumentId());
        return voXOrderWhenCheckout;
    }
}
