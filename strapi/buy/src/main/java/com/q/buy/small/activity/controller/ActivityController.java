package com.q.buy.small.activity.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.activity.service.ActivityServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "activities")
public class ActivityController {

    @Autowired
    ActivityServiceImpl activityService;

    @GetMapping
    public HResult<Object> gets() {
        return HResult.ok(
                activityService.page(new Page<>(1, 10), null)
        );
    }
}
