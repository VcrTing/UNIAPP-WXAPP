package com.q.buy.common.lock;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class KeyLock {
    private static final Map<String, Object> LOCK = new ConcurrentHashMap<>();

    public static boolean lock(String key) {
        Object my = new Object();
        Object o = LOCK.computeIfAbsent(key, l -> my);
        return my == o;
    }

    public static void unLock(String key) {
        LOCK.remove(key);
    }
}

