package com.q.buy.module.media.controller;


import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.module.media.form.ProductMediaForm;
import com.q.buy.module.media.model.ProductMedia;
import com.q.buy.module.media.serivce.ProductMediaServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Slf4j
@RestController
@RequestMapping(NetConfig.API_LINK + "medias")
public class ProductMediaController {
    @Autowired
    ProductMediaServiceImpl activityMediaService;

    @PostMapping("upload")
    public HResult<List<ProductMedia>> uploads(ProductMediaForm form, HttpServletRequest request) {
        return HResult.ok(activityMediaService.uploads(form, request));
    }

    @PostMapping("upload/one")
    public HResult<ProductMedia> upload(ProductMediaForm form, HttpServletRequest request) {
        // Map<String, Object> data = form.getFormData();
        return HResult.ok(activityMediaService.upload(request, form.getFile(), form.getIsGallery()));
    }
}
