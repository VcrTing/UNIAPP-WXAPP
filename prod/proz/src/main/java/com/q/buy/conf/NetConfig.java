package com.q.buy.conf;

public interface NetConfig {

    String API = "backend";
    String API_LINK = "/" + API + "/";

    String SMALL = "small";
    String SMALL_LINK = "/" + API + "/" + SMALL + "/";
    String AUTH = "auth";
    String AUTH_LINK = "/" + API + "/" + SMALL + "/" + AUTH + "/";
}
