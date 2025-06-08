package com.q.buy.small.activity.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityMediaForm {
    List<MultipartFile> files;
    MultipartFile file;
    Integer isGallery;
    Long activityId;
    // Map<String, Object> formData;
}
