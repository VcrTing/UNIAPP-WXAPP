package com.q.buy.module.user.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.q.buy.conf.NetConfig;
import com.q.buy.framework.common.CommonParam;
import com.q.buy.framework.result.HResult;
import com.q.buy.module.user.model.entity.UpUser;
import com.q.buy.module.user.service.UpUserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "users")
public class UpUserController {

    @Autowired
    UpUserServiceImpl upUserService;

    @GetMapping
    public HResult<IPage<UpUser>> get(CommonParam param) {
        param.checkPager();
        IPage<UpUser> o = upUserService.page(new Page<>(param.getPage(), param.getPageSize()), null);
        return HResult.ok( o );
    }
}
