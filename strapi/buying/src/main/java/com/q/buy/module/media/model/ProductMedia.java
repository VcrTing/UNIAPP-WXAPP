package com.q.buy.module.media.model;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@TableName("x_product_media")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductMedia {
    @TableId
    String documentId;
    Date createdAt;
    String updateBy;
    @TableLogic
    Integer deleted;

    Integer dataStatus;

    String url;
    String urlSmall;
    Integer sortOrder;
    Integer mediaType;
    Integer isGallery;
    String productDocumentId;
    Integer isSex;
    //
    BigDecimal w;
    BigDecimal h;
}
