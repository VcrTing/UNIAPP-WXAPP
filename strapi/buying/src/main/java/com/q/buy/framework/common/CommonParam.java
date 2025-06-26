package com.q.buy.framework.common;

import com.q.buy.util.q.QVUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonParam {

    String documentId;

    Integer page;
    Integer pageSize;

    public void checkData() {
        if (QVUtil.notLen(documentId)) throw new RuntimeException("死黑客，数据必传。");
    }

    public void checkPager() {
        page = QVUtil.serInt(page, 1);
        pageSize = QVUtil.serInt(pageSize, 100);
    }
}
