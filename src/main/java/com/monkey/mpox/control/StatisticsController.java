package com.monkey.mpox.control;

import com.monkey.mpox.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired StatisticsService statisticsService;
    @Autowired HttpServletResponse response;

    @GetMapping("/loaddata")    // 모든 데이타들 메모리에 올리기
    public boolean loaddata(){
        return statisticsService.loadData();
    }

    // 구글 지오맵에 써먹을 json(map) 호출
    @GetMapping("/viewgeo")
    public void viewgeo(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(statisticsService.getww());
        }catch (Exception e){System.out.println(e);}
    }

    @GetMapping("/getdatadate")
    public Map getdatadate(){
        return statisticsService.getSortedByDate();
    }
}
