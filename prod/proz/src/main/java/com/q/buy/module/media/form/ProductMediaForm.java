package com.q.buy.module.media.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductMediaForm {
    List<MultipartFile> files;
    MultipartFile file;
    Integer isGallery;
    Long activityId;
    // Map<String, Object> formData;
}
