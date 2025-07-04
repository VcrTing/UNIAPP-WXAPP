package com.q.buy.module.order.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class XOrderLock {
    @TableId(type = IdType.AUTO) // (type = IdType.INPUT)
    Long id;
    Date createdAt;
    Date updatedAt;
    @TableLogic
    Integer deleted;
    Integer version;

    String userDocumentId;
    String orderDocumentId;
    //
    Integer finishedStatus;
}
