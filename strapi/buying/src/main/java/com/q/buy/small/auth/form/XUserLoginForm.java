package com.q.buy.small.auth.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class XUserLoginForm {
    String phone;
    Integer countryCode;
}
