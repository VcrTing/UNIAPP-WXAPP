package com.q.buy.framework.result;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.q.buy.framework.common.pager.StrapiResultPager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    String message = "操作成功！";

    Integer code = 0;

    T data;

    private long timestamp = System.currentTimeMillis();

    public static <T> HResult<T> ok() {
        HResult<T> r = new HResult<>();
        r.setCode(200);
        r.setData(null);
        return r;
    }
    public static <T> HResult<T> ok(T data) {
        HResult<T> r = new HResult<>();
        r.setCode(200);
        r.setData(data);
        return r;
    }

    public static <T> HResult<T> error(String msg) {
        return error(500, msg);
    }

    public static <T> HResult<T> error(int code, String msg) {
        HResult<T> r = new HResult<>();
        r.setCode(code);
        r.setMessage(msg);
        return r;
    }
}
