package com.q.buy.util.q;


import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class QVUtil {
    public static boolean hasLen(String v) {
        return StringUtils.hasLength(v);
    }
    public static boolean notLen(String v) {
        return !StringUtils.hasLength(v);
    }

    public static String serStr(Object src) {
        if (src == null) return "";
        return src.toString().trim();
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
}
