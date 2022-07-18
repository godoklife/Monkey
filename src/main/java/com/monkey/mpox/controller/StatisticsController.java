package com.monkey.mpox.controller;

import com.monkey.mpox.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired StatisticsService statisticsService;
    @Autowired HttpServletResponse response;

    @GetMapping("/selectlanguage")  // 언어 선택시
    public void selectLanguage() {
        statisticsService.selectlanguage(); // 기존 json 데이터 지우기
    }

    @GetMapping("/loaddata")    // 모든 데이타들 메모리에 올리기
    public boolean loaddata(@RequestParam String language){
        statisticsService.selectlanguage();
        return statisticsService.loadData(language);
    }


    // todo: 여기 뭐하는 부분인지 체크 필요함 2022.07.06 15:53
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

    // 구글지오차트에 쓸 국가별로 확진자 수 정리된 jsonArray
    @GetMapping("/getgeochartdata")
    public void getGeoChartData(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(statisticsService.getSortedByCountry());
        }catch (Exception e){System.out.println(e);}
    }

    //전체데이터가져오기
    @GetMapping("/getalldata")
    public void getalldata(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(statisticsService.getSortedByDate());
        }catch (Exception e){
            System.out.println("전체데이터가져오기에러" + e);
        }
    }

    @GetMapping("/testgetdata")
    public void testgetdata(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(statisticsService.readjsonArrayFile());
        }catch (Exception e){
            System.out.println("전체데이터가져오기에러" + e);
        }
    }
}
