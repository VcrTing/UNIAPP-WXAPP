package com.q.buy.framework.define.enums;


public enum EnumBoolean {

    TRUE(1),
    FALSE(0);

    EnumBoolean(int v) { this.v = v; }

    private final int v;

    public int getValue() {
        return this.v;
    }

    public static boolean isTrue(Integer src) {
        if (src == null) return false;
        return src == TRUE.getValue();
    }
}