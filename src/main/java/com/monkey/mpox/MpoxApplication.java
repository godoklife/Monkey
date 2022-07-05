package com.monkey.mpox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MpoxApplication {

    public static void main(String[] args){
//        System.setProperty("file.encoding","UTF-8");    // 혹시 몰라서 심어둠. 배포한 뒤에도 이상없으면 @삭제 해도 됨.
        SpringApplication.run(MpoxApplication.class, args);
    }

}
