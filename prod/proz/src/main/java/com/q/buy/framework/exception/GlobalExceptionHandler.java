package com.q.buy.framework.exception;

import com.q.buy.framework.result.HResult;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 处理自定义业务异常
    @ExceptionHandler(QException.class)
    public HResult<?> handle(
            QException ex, WebRequest request) {
        ex.printStackTrace();
        return HResult.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }

    // 处理自定义业务异常
    @ExceptionHandler(RuntimeException.class)
    public HResult<?> handle(
            RuntimeException ex, WebRequest request) {
        ex.printStackTrace();
        return HResult.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }

    // 处理数据不存在异常
    @ExceptionHandler(Exception.class)
    public HResult<?> handle(
            Exception ex, WebRequest request) {
        ex.printStackTrace();
        return HResult.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }
}

