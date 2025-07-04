package com.q.buy.framework.result;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.q.buy.framework.common.pager.StrapiResultPager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HResultStrapi<T> {

    String message = "操作成功！";
    Integer code = 0;

    List<T> data;
    StrapiResultPager meta;

    private long timestamp = System.currentTimeMillis();

    public static <T> HResultStrapi<T> ok(IPage<T> pager) {
        HResultStrapi<T> res = new HResultStrapi<T>();
        StrapiResultPager meta = StrapiResultPager.init(pager);
        res.setMeta(meta);
        res.setData(pager.getRecords());
        res.setCode(200);
        return res;
    }
}
