package com.q.buy.util.q;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;

public final class QMediaUtil {

    final static String SPT = File.separator;

    public static int[] getImageWH(MultipartFile file) throws IOException {
        BufferedImage image = ImageIO.read(file.getInputStream());
        if (image == null) {
            throw new IOException("无法读取图片文件，可能不是有效的图片格式");
        }
        return new int[]{ image.getWidth(), image.getHeight() };
    }
    public static boolean isImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    // 储存前检测文件夹
    public static boolean checkDir(String path) {
        boolean res = true;
        File f = new File(path);
        try {
            if (f.exists()) return true;
            res = f.mkdirs();
        }
        catch (SecurityException se) {
            throw new RuntimeException("防火墙不让创建文件夹");
        }
        return res;
    }

    // 删除文件
    public static boolean deleteFile(String path) {
        File file = new File(path);
        if (file.isFile() && file.exists()) {
            file.delete(); return true;
        }
        return false;
    }

    public static void close(InputStream iss) {
        try { if (iss != null) iss.close();
        } catch (Exception e) { e.printStackTrace(); }
    }

    public static void close(OutputStream iss) {
        try { if (iss != null) iss.close();
        } catch (Exception e) { e.printStackTrace(); }
    }

    public static String linkPath(String path, String fileName) {
        Path dir = Paths.get(path);
        Path f = dir.resolve(fileName);
        return f.toString();
    }

    public static boolean exists(String filePath) {
        Path path = Paths.get(filePath);
        return Files.exists(path);
    }

    public static void dirMustExists(String directory) {
        try {
            Path dirPath = Paths.get(directory);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
        }
        catch (Exception e) { e.printStackTrace(); }
    }

    public static boolean saveFile(byte[] data, String directory, String fileName) {
        try {
            // 确保目录存在
            Path dirPath = Paths.get(directory);
            dirMustExists(directory);
            // 保存文件
            Path filePath = dirPath.resolve(fileName);
            Files.write(filePath, data);
            return true;
        }
        catch (IOException e) {
            e.printStackTrace();
            new RuntimeException("保存文件失败: " + e.getMessage());
        }
        return false;
    }

    public static void deleteFolder(String dir) {
        try {
            Path path = Paths.get(dir);
            // 文件夹不存在，无需删除
            if (!Files.exists(path)) { return; }
            // 递归删除所有文件和子目录
            Files.walk(path)
                    .sorted(Comparator.reverseOrder()) // 先删除文件，再删除目录
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            throw new RuntimeException("无法删除: " + p, e);
                        }
                    });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 改文件名称加后缀
    public static String addTimestampToFilename(String originalFilename) {
        // 获取当前时间并格式化为字符串
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("MMddHHmm"));
        // 分离文件名和扩展名
        int dotIndex = originalFilename.lastIndexOf('.');
        String nameWithoutExtension = (dotIndex == -1) ? originalFilename
                : originalFilename.substring(0, dotIndex);
        String extension = (dotIndex == -1) ? ""
                : originalFilename.substring(dotIndex);
        // 组合新文件名
        return nameWithoutExtension + "_" + timestamp + extension;
    }

    public static ResponseEntity<Resource> responseFile(String fs) {
        try {
            Path filePath = Paths.get(fs).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            //
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e) {
            // return ResponseEntity.internalServerError().build();
        }
        return null;
    }
}
