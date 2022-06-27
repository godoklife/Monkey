package com.monkey.mpox.control;

import com.monkey.mpox.service.StoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
    @Autowired StoringService storingService;
    @GetMapping("/")
    public String main(){
        return "main";
    }

    @GetMapping("/stealingjson")
    @ResponseBody
    public void stealingjson(){

    }
}
