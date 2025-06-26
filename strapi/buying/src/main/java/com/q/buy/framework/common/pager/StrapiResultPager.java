package com.q.buy.framework.common.pager;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StrapiResultPager {
    Long page;
    Long pageSize;
    Long total;
    Long pageCount;

    public static <T> StrapiResultPager init(IPage<T> pager) {
        StrapiResultPager res = new StrapiResultPager();
        res.setTotal(pager.getTotal());
        res.setPageSize(pager.getSize());
        res.setPageCount(pager.getPages());
        res.setPage(pager.getCurrent());
        return res;
    }
}
