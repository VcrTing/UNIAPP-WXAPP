package com.q.buy.module.order.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderMakeForm {
    String documentId;

    Integer isStartSend;
}
