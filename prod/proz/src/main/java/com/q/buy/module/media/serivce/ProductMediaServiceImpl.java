package com.q.buy.module.media.serivce;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.q.buy.module.media.form.ProductMediaForm;
import com.q.buy.module.media.model.ProductMedia;
import com.q.buy.module.media.mappers.ProductMediaMapper;
import com.q.buy.backend.media.UploadTool;
import com.q.buy.util.q.QListUtil;
import com.q.buy.util.q.QMediaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.*;

@Service
public class ProductMediaServiceImpl extends ServiceImpl<ProductMediaMapper, ProductMedia> {

    @Autowired
    UploadTool uploadTool;

    @Transactional
    public ProductMedia upload(HttpServletRequest request, MultipartFile file, Integer isGallery) {
        ProductMedia media = new ProductMedia();
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
        media.setDataStatus(1);
        media.setCreatedAt(new Date());
        String acc = uploadTool.buildAccessLink(request, fileName);
        media.setUrlSmall(acc);
        media.setUrl(acc);
        //
        if (!this.save(media)) throw new RuntimeException("媒体储存错误");
        //
        return media;
    }

    @Transactional
    public List<ProductMedia> uploads(ProductMediaForm form, HttpServletRequest request) {

        List<ProductMedia> res = new ArrayList<>();
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
