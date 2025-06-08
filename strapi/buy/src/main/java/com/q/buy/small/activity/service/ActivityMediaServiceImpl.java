package com.q.buy.small.activity.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.small.activity.form.ActivityMediaForm;
import com.q.buy.small.activity.model.entity.ActivityMedia;
import com.q.buy.small.activity.mappers.ActivityMediaMapper;
import com.q.buy.small.media.tool.UploadTool;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QMediaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.util.*;

@Service
public class ActivityMediaServiceImpl extends ServiceImpl<ActivityMediaMapper, ActivityMedia> {

    @Autowired
    UploadTool uploadTool;

    @Transactional
    public ActivityMedia upload(HttpServletRequest request, MultipartFile file, Integer isGallery) {
        ActivityMedia media = new ActivityMedia();
        String fileName = "";
        try {
            fileName = uploadTool.upload(file);

            if (QMediaUtil.isImage(file)) {
                int[] wh = QMediaUtil.getImageWH(file);
                media.setW(BigDecimal.valueOf(wh[0]));
                media.setH(BigDecimal.valueOf(wh[1]));
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("上传文件错误");
        }
        media.setMediaType(0);
        media.setIsGallery(isGallery);
        media.setIsFreezing(0);
        media.setCreateTime(new Date());
        String acc = uploadTool.buildAccessLink(request, fileName);
        media.setUrlSmall(acc);
        media.setUrl(acc);
        //
        if (!this.save(media)) throw new RuntimeException("媒体储存错误");
        //
        return media;
    }

    @Transactional
    public List<ActivityMedia> uploads(ActivityMediaForm form, HttpServletRequest request) {

        List<ActivityMedia> res = new ArrayList<>();
        try {
            List<MultipartFile> files = form.getFiles();
            if (QListUtil.isBadList(files)) { throw new RuntimeException("没文件"); }
            for (MultipartFile file : files) {
                //
                res.add(upload(request, file, form.getIsGallery()));
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }
}
