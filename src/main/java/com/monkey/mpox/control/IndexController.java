package com.monkey.mpox.control;

import com.monkey.mpox.service.JsonService;
import com.monkey.mpox.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
public class IndexController {
    @Autowired
    JsonService jsonService;
    @Autowired StatisticsService statisticsService;
    @Autowired HttpServletResponse response;


    @GetMapping("/testpage")
    public String testpage(){
        return "testpage";
    }

    @GetMapping("/")
    public String notmain(){
//        System.setProperty("file.encoding","UTF-8");
//        System.out.println(Charset.defaultCharset());
        return "notmain";
    }
    @GetMapping("/jsontable")
    public String jsontable(){
        return "jsontable";
    }

    @GetMapping("/view")
    public String wwstatistics(){
        return "view";
    }


    @GetMapping("/stealingjson")
    @ResponseBody
    public boolean stealingjson(){
        return jsonService.getjsonFromServer();
    }

    @GetMapping("/readjsonfile")
    @ResponseBody
        // 리턴형이 void임에도 어노테이션을 선언하는 까닭?? response가 응답할 대상의 주소를 갖고있음
    public void readjsonfile(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(jsonService.readjsonArrayFile());
        }catch (Exception e){System.out.println(e);}

    }

    // 세계통계 json 출력
    @GetMapping("/viewgeo")
    @ResponseBody
    public void viewgeo(){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().println(statisticsService.getww());
        }catch (Exception e){System.out.println(e);}
    }
    
    @GetMapping("/getdataDate")
    @ResponseBody
    public Map getdataDate(){
        return statisticsService.getSortedByDate();
    }

}
