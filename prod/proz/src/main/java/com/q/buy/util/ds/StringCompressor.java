package com.q.buy.util.ds;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.zip.Deflater;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterInputStream;

public class StringCompressor {

    /**
     * 使用Deflater压缩字符串
     * @param input 要压缩的字符串
     * @return 压缩后的字节数组
     */
    public static byte[] compress(String input) {
        if (input == null || input.isEmpty()) {
            return new byte[0];
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (DeflaterOutputStream dos = new DeflaterOutputStream(baos, new Deflater(Deflater.BEST_COMPRESSION))) {
            dos.write(input.getBytes("UTF-8"));
        } catch (IOException e) {
            throw new RuntimeException("压缩失败", e);
        }
        return baos.toByteArray();
    }

    /**
     * 解压缩字符串
     * @param compressed 压缩后的字节数组
     * @return 解压后的字符串
     */
    public static String decompress(byte[] compressed) {
        if (compressed == null || compressed.length == 0) {
            return "";
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ByteArrayInputStream bais = new ByteArrayInputStream(compressed);
             InflaterInputStream iis = new InflaterInputStream(bais)) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = iis.read(buffer)) > 0) {
                baos.write(buffer, 0, len);
            }
            return baos.toString("UTF-8");
        } catch (IOException e) {
            throw new RuntimeException("解压失败", e);
        }
    }

    /**
     * 压缩并Base64编码字符串
     * @param input 要压缩的字符串
     * @return Base64编码的压缩字符串
     */
    public static String compressAndEncode(String input) {
        byte[] compressed = compress(input);
        return Base64.getEncoder().encodeToString(compressed);
    }

    /**
     * 解码Base64并解压缩字符串
     * @param encoded 编码后的字符串
     * @return 原始字符串
     */
    public static String decodeAndDecompress(String encoded) {
        byte[] compressed = Base64.getDecoder().decode(encoded);
        return decompress(compressed);
    }

    /**
     * 简单的字符串缩短方法（适用于特定模式）
     * @param input 输入字符串
     * @return 缩短后的字符串
     */
    public static String shortenPattern(String input) {
        // 这里可以实现特定领域的缩短逻辑
        // 例如：将重复的模式替换为标记
        return input.replaceAll("(\\w+)\\s+\\1", "$1");
    }

    // 使用示例
    public static void main(String[] args) {
        String original = "这是一个非常非常长的字符串，需要被压缩。这是一个非常非常长的字符串，需要被压缩。";

        // 压缩示例
        byte[] compressed = compress(original);
        System.out.println("压缩后大小: " + compressed.length + " 字节");

        // 解压示例
        String decompressed = decompress(compressed);
        System.out.println("解压后内容: " + decompressed);

        // Base64编码压缩示例
        String encoded = compressAndEncode(original);
        System.out.println("Base64压缩后: " + encoded);

        // Base64解码解压示例
        String decoded = decodeAndDecompress(encoded);
        System.out.println("解码解压后: " + decoded);

        // 简单模式缩短示例
        String shortened = shortenPattern(original);
        System.out.println("模式缩短后: " + shortened);
    }
}