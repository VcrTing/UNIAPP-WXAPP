CREATE TABLE `x_order_lock` (
                                `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
                                `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                `deleted` int(11) DEFAULT '0' COMMENT '逻辑删除标记（0-未删除，1-已删除）',
                                `version` int(11) DEFAULT '0' COMMENT '乐观锁版本号',
                                `user_document_id` varchar(64) NOT NULL COMMENT '用户文档ID',
                                `order_document_id` varchar(64) NOT NULL COMMENT '订单文档ID',
                                `finished_status` int(11) DEFAULT '0' COMMENT '完成状态',
                                PRIMARY KEY (`id`),
                                KEY `idx_user_document` (`user_document_id`),
                                KEY `idx_order_document` (`order_document_id`),
                                KEY `idx_status` (`finished_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单锁定表';