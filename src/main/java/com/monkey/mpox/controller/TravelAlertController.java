package com.monkey.mpox.controller;

import com.monkey.mpox.service.TravelAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/travel")
public class TravelAlertController {

    @Autowired
    TravelAlertService travelAlertService;

    @GetMapping("/gettravel")
    public void getTravelAlert(HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(travelAlertService.getTravelAlert());
        }catch (Exception e){
            System.out.println("JSON 읽어오기 컨트롤에러: " + e);
        }
    }

}
