package com.q.buy.small.user.controller;

import com.q.buy.framework.result.HResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @GetMapping
    public HResult<Object> next() {
        return HResult.ok("INDEX");
    }
}
