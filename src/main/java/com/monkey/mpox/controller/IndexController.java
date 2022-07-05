package com.monkey.mpox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/travel")
    public String travel(){
        return "travel";
    }

    @GetMapping("/chart")
    public String chart(){
        return "chart";
    }

    @GetMapping("/mpinfo")
    public String main(){
        return "mpinfo";
    }
    @GetMapping("/news")
    public String news(){
        return "news";
    }



}
