package com.monkey.mpox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String mainpage(){
        return "mainpage";
    }

    @GetMapping("/en")
    public String mainpage_en(){
        return "mainpage_en";
    }

    @GetMapping("/zh")
    public String mainpage_zh(){
        return "mainpage_zh";
    }

    @GetMapping("/ja")
    public String mainpage_ja(){
        return "mainpage_ja";
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
    @GetMapping("/footer")
    public String footer(){return "footer";}

    @GetMapping("/trollbox")
    public String trollbox(){
        return "trollbox";
    }

}
