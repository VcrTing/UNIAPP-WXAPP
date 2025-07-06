package com.q.buy.module.product.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@TableName("products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @TableId(type = IdType.AUTO) // (type = IdType.INPUT)
    Long id;
    String documentId;
    Date createdAt;
    Date updatedAt;
    String updatedBy;
    String createdBy;

    Integer inv;
    Integer InvTyped;
    Integer invWeak;

    String title;

    Integer dataStatus;
}
