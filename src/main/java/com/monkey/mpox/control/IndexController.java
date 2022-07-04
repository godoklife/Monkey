package com.monkey.mpox.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class IndexController {

    @Autowired
    HttpServletResponse response;


    @GetMapping("/")
    public String chart() {
//        System.setProperty("file.encoding","UTF-8");
//        System.out.println(Charset.defaultCharset());
        return "chart";
    }
}