package com.q.buy.util.q;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;

public final class QDateUtil {

    final static String PA = "yyyy-MM-dd HH:mm:ss";
    final static String PA_SIMPLY = "yyyy-MM-dd";

    public static boolean same(Date src1, Date src2) {
        if (src1 == null) {
            if (src2 == null) { return true; }
        }
        if (src2 == null) { if (src1 == null) { return true;} }
        return src1.equals(src2);
    }

    public static String format(Date src) {
        if (src == null) return "";
        return DateFormatUtils.format(src, PA);
    }

    public static Date parse(Object src) {
        Date a = null;
        if (src == null) return null;
        try {
            a = DateUtils.parseDate(src.toString(), PA);
        }
        catch (Exception e) { }
        return a;
    }

    public static String fmt(Date src, String pa) {
        try {
            if (src == null) return "";
            return DateFormatUtils.format(src, pa);
        }
        catch (Exception e) {
            // e.printStackTrace();
            e.printStackTrace();
        }
        return "";
    }
    public static String fmt(Date src) { return fmt(src, PA); }
    public static String fmt1(Date src) { return fmt(src, PA_SIMPLY); }

    public static Date pse(Object src) {
        Date a = null; if (src == null) return null;
        try { a = DateUtils.parseDate(src.toString(), PA_SIMPLY); } catch (Exception e) { } return a;
    }

    public static Date oldestDay() {
        return pse("1999-09-09");
    }

    // 加一天
    public static Date addDay(Date src, int num) {
        Calendar c = Calendar.getInstance();
        c.setTime(src);
        c.add(Calendar.DATE, num);
        return c.getTime();
    }

    // 减去几分钟
    public static Date minMinute(Date src, int minutes) {
        LocalDateTime tt = src.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        LocalDateTime ldt = tt.minusMinutes(minutes);
        return Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
    }
    public static Date addMinute(Date src, int minutes) {
        LocalDateTime tt = src.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        LocalDateTime ldt = tt.plusMinutes(minutes);
        return Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date defaultDay(Date src, Date def) {
        if (src == null) return def == null ? new Date() : def;
        return src;
    }

    public static Date nowAddMinute(int minutes) {
        // ZoneId.of("Asia/Shanghai")
        Date dt = addMinute(new Date(), minutes);
        // System.out.println("FMT " + fmt(dt));
        return dt;
    }
}
