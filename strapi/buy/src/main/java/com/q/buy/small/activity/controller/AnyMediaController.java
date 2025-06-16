package com.q.buy.small.activity.controller;


import com.q.buy.conf.NetConfig;
import com.q.buy.framework.result.HResult;
import com.q.buy.small.activity.form.ActivityMediaForm;
import com.q.buy.small.activity.model.entity.ActivityMedia;
import com.q.buy.small.activity.service.ActivityMediaServiceImpl;
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
public class AnyMediaController {
    @Autowired
    ActivityMediaServiceImpl activityMediaService;

    @PostMapping("upload")
    public HResult<List<ActivityMedia>> uploads(ActivityMediaForm form, HttpServletRequest request) {
        return HResult.ok(activityMediaService.uploads(form, request));
    }

    @PostMapping("upload/one")
    public HResult<ActivityMedia> upload(ActivityMediaForm form, HttpServletRequest request) {
        // Map<String, Object> data = form.getFormData();
        return HResult.ok(activityMediaService.upload(request, form.getFile(), form.getIsGallery()));
    }
}
