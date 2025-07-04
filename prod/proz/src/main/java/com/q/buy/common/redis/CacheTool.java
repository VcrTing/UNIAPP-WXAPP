package com.q.buy.common.redis;

import com.q.buy.util.q.QVUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

// 再次封装 redis tool/util 的 tool
@Component
public class CacheTool {
    @Autowired
    RedisRunner redisRunner;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public final static int LIVE_SECOND_LOGIN = 60 * 60 * 24 * 7;

    final static int LIVE_SECOND = 60 * 15; // 全局默认 15 分钟
    public final int LIVE_SECOND_X3 = 60 * 150; // 全局默认 150 分钟

    // 组装 KEY
    public String key(String prefix, Object ...src) {
        StringBuilder sb = new StringBuilder(prefix);
        Arrays.stream(src).forEach(s -> {
            sb.append(":").append(s == null ? "null" : s.toString());
        });
        return sb.toString();
    }

    // 延长时间，延长为 15 分钟 + 随机数
    public void expire(String key) { redisRunner.expire(key, LIVE_SECOND + QVUtil.random()); }
    public void expire(String key, int second) { redisRunner.expire(key, second + QVUtil.random()); }

    // 获取
    public <T> T get(String key) {
        try {
            Object src = redisRunner.get(key);
            if (src != null) return (T) src;
        } catch (Exception ignored) {  } return null;
    }

    // 刷新
    public <T> void refresh(String key, T data, int second) {
        if (data == null || key == null) return;
        redisRunner.set(key, data, second);
        // try { redisUtil.set(key, res, LIVE_SECOND); } catch (Exception ignored) { }
    }

    // 刷新时，是有随机时间的，用来减缓数据库压力
    public <T> void refresh(String key, T data) {
        refresh(key, data, LIVE_SECOND + QVUtil.random());
    }

    /*
    public <T> void refreshList(String key, List<T> data) {
        redisUtil.lSet(key, data, LIVE_SECOND + QValueUtil.random());
    }
     */


    public <T> void refreshList(String key, List<T> data) {
        redisTemplate.opsForList().rightPush(key, data, LIVE_SECOND + QVUtil.random());
    }

    public <T> List<T> getList(String key, int star, int end) {
        List list = redisTemplate.opsForList().range(key, star, end);
        return list;
    }

    // 删除
    public void del(String key) {
        try {
            redisRunner.delete(key);
        }
        catch (Exception e) { }
    }

    // 自定义的获取数据方法

}
