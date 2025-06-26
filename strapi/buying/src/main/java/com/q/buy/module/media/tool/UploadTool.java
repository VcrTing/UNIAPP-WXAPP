package com.q.buy.module.media.tool;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class UploadTool {

    @Value("${media.save.path}")
    String path;

    public String upload(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) throw new RuntimeException("无文件。");
        // 创建上传目录（如果不存在）
        Path uploadPath = Paths.get(path);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // 生成唯一文件名（防止覆盖）
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        // 保存文件
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    @Value("${media.access.path}")
    String accessPath;
    public String buildAccessLink(HttpServletRequest request, String fileName) {
        String baseLink = request.getScheme() + "://" +
                request.getServerName() +
                (request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
                request.getContextPath();
        return baseLink + "/" + accessPath + "/" + fileName;
    }

    private String determineContentType(String filename) {
        // 简单实现 - 实际应用中可以使用更完善的MIME类型检测
        if (filename.endsWith(".pdf")) {
            return "application/pdf";
        } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (filename.endsWith(".png")) {
            return "image/png";
        }
        // 默认返回二进制流
        return "application/octet-stream";
    }
}
