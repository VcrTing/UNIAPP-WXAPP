package com.q.buy.util.q;


import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

public final class QVUtil {
    public static boolean hasLen(Object v) {
        return StringUtils.hasLength(serStr(v));
    }
    public static boolean notLen(Object v) {
        return !StringUtils.hasLength(serStr(v));
    }

    public static String serStr(Object src) {
        if (src == null) return "";
        return src.toString().trim();
    }
    public static Long serLong(Object src, Long def) {
        if (src == null) return def;
        if (src instanceof String) {
            if (src.equals("")) return def;
        }
        if (src instanceof Boolean) {
            return def;
        }
        try {
            return Long.parseLong(src.toString());
        }
        catch (Exception e) { }
        return def;
    }
    public static Integer serInt(Object src, Integer def) {
        if (src == null) return def;
        if (src instanceof String) {
            if (src.equals("")) return def;
        }
        if (src instanceof Boolean) {
            return def;
        }
        try {
            return Integer.parseInt(src.toString());
        }
        catch (Exception e) { }
        return def;
    }

    public static List<Map<String, Object>> objToListMap(Object object) {
        if (object == null) return null;
        try {
            return (List<Map<String, Object>>) object;
        } catch (Exception e) {
            try {
                List<Map> src = JSONUtil.toList(object.toString(), Map.class);
                if (src == null) return null;
                List<Map<String, Object>> res = new ArrayList<>();
                for (Map one: src) {
                    res.add((Map<String, Object>)one);
                }
                return res;
            } catch (Exception e2) { }
        }
        return null;
    }

    public static <T, R> IPage<R> changeIPage(IPage<T> src, List<R> resList) {
        IPage<R> res = new Page<>(src.getPages(), src.getSize());
        res.setTotal(src.getTotal());
        res.setRecords(resList);
        res.setPages(src.getPages());
        res.setSize(src.getSize());
        res.setCurrent(src.getCurrent());
        return res;
    }

    public static int random() {
        return new Random().nextInt(100);
    }
    public static int max(int src, int max) {
        return src >= max ? src : max;
    }

}
