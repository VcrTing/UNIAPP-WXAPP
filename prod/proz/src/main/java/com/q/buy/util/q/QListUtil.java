package com.q.buy.util.q;

import cn.hutool.json.JSONUtil;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

public final class QListUtil {
    static String JOIN_SPLIT_CHAR = "_#_";

    public static <T> List<T> niceList(List<T> srcList) {
        if (srcList != null) return srcList; return new ArrayList<T>();
    }

    public static <T> boolean isNiceList(List<T> src) {
        return src != null && !src.isEmpty();
    }
    public static <T> boolean isOneDataList(List<T> src) {
        if (src != null) {
            return src.size() == 1;
        }
        return false;
    }

    // 保底
    public static <T> List<T> baodiList(List<T> src, List<T> bd1, List<T> bd2) {
        if (QListUtil.isBadList(src)) {
            if (QListUtil.isNiceList(bd1)) { return bd1; }
            else if (QListUtil.isNiceList(bd2)) { return bd2; }
        } return src;
    }

    public static <T> T first(List<T> src) {
        return isNiceList(src) ? src.get(0) : null;
    }
    public static <T> T last(List<T> src) {
        if (QListUtil.isNiceList(src)) { return src.get(src.size() - 1); } return null;
    }
    public static <T> List<T> nextALL(List<T> src) {
        List<T> res = new ArrayList<>();
        if (isNiceList(src)) {
            for (int i = 0; i < src.size(); ++i) {
                if (i != 0) {
                    res.add(src.get(i));
                }
            }
        }
        return res;
    }


    public static <T> ArrayList<T> soleList(List<T> src) {
        return new ArrayList<T>(new HashSet<T>(src));
    }

    public static <T> boolean isBadList(List<T> src) {
        return src == null || src.isEmpty();
    }

    public static String joinList(List<String> src) {
        if (src == null) return "";
        StringBuilder sb = new StringBuilder();
        src.forEach(s -> sb.append(s == null ? "" : (s + JOIN_SPLIT_CHAR)));
        return sb.toString();
    }
    public static String joinList(String ...src) {
        if (src == null) return "";
        StringBuilder sb = new StringBuilder();
        Arrays.stream(src).forEach(s -> sb.append(s == null ? "" : (s + JOIN_SPLIT_CHAR)));
        return sb.toString();
    }

    public static String joinList(List<String> src, String chr) {
        if (src == null) return "";
        StringBuilder sb = new StringBuilder();
        src.forEach(s -> sb.append(s == null ? "" : (s + chr)));
        return sb.toString();
    }
    /*
    // 取交集
    public static List<String> intersect(List<String> src1, List<String> src2) {
        if (isBadList(src1)) return new ArrayList<>();
        if (isBadList(src2)) return new ArrayList<>();
        return new ArrayList<>(CollectionUtils.intersection(src1, src2));
    }
    */
    public static List<String> intersect(List<List<String>> src) {
        if (QListUtil.isBadList(src)) return new ArrayList<>();
        // 取隐藏数据的交集返回
        List<String> intersect = new ArrayList<>();
        //
        src.forEach(hf -> {
            if (intersect.isEmpty()) intersect.addAll(hf);
            intersect.retainAll(hf);
        });
        // 返回
        return intersect;
    }

    // 删除某元素
    public static List<String> removeLast(String[] src) {
        String[] src2 = Arrays.copyOfRange(src, 0, src.length - 1);
        return new ArrayList<>(Arrays.asList(src2));
    }
    public static List<String> remove(List<String> srcList, String tar) {
        if (tar == null) return srcList;
        return srcList.stream()
                .filter(Objects::nonNull)
                .filter(s->!s.equals(tar)).collect(Collectors.toList());
    }
    public static List<String> remove(List<String> srcList, List<String> tarList) {
        if (isBadList(tarList)) return srcList;
        return srcList.stream()
                .filter(Objects::nonNull)
                .filter(s->!tarList.contains(s)).collect(Collectors.toList());
    }

    //
    public static List<String> deleteSame(List<String> src) {
        return new ArrayList<>(new HashSet<>(src));
    }

    // String list 加数据
    public static List<String> stringListJsonAddList(String json, List<String> dataList) {
        if (QListUtil.isBadList(dataList)) throw new RuntimeException("没传入 dataList");
        List<String> originList = getListFromJson(json);
        originList.addAll(dataList);
        return originList;
    }
    // String list 加数据
    public static List<String> stringListJsonRemoveList(String json, List<String> dataList) {
        if (QListUtil.isBadList(dataList)) throw new RuntimeException("没传入 dataList");
        List<String> originList = getListFromJson(json);
        List<String> resList = new ArrayList<>();
        for (String s: originList) {
            if (!dataList.contains(s)) { resList.add(s); }
        }
        return resList;
    }

    // 拿出 List String
    public static List<String> getListFromJson(String json) {
        List<String> res = StringUtils.hasLength(json) ? JSONUtil.toList(json, String.class) : new ArrayList<>();
        return isBadList(res) ? new ArrayList<>() : res;
    }


    // 分页
    public static List<Map<String, Object>> pageList(List<Map<String, Object>> srcList, Integer page, Integer size) {
        page = page == null ? 0 : page;
        page = page <= 0 ? 1 : page;
        size = size == null ? 0 : size;

        //
        int star = (page - 1) * size;
        List<Map<String, Object>> resList = new ArrayList<>();
        int idx = 0;
        int sz = 0;
        for (Map<String, Object> item: srcList) {
            if (idx >= star && sz < size) { resList.add(item); sz += 1; }
            idx += 1;
        }
        System.out.println(resList);
        return resList;
    }
}
