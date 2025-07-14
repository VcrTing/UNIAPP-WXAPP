package com.q.buy.module.order.task;

import com.q.buy.module.order.tool.OrderExpireTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RunningTask {

    @Autowired
    OrderExpireTool orderExpireTool;

    // 检测订单过期
    @Scheduled(cron = "0 */2 * * * *")
    public void task() {

        try {
            log.info("开始检测订单过期。");
            orderExpireTool.expireAnyOrder();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
