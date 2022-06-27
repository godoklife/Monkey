package com.monkey.mpox.control;

import com.monkey.mpox.service.NotJsonService;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class IndexController {
    @Autowired NotJsonService notJsonService;
    @Autowired HttpServletResponse response;
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

    @RequestMapping("/stealingjson")
    @ResponseBody
    public boolean stealingjson(){
        return notJsonService.autoUpdateJson();
    }


//    ????????????????? ->> 콘솔에 {empty: false} 찍힘.
//    @RequestMapping("/readjsonfile")
//    @ResponseBody
//    public JSONArray readjsonfile(){
//        JSONArray jsonArray = new JSONArray();
//        jsonArray = notJsonService.readJsonFile();
//        System.out.println(jsonArray.toString());
//        return jsonArray;
//    }

//    @RequestMapping("/readjsonfile")
//    @ResponseBody
//    public String readjsonfile(){
//        JSONArray jsonArray = new JSONArray();
//        jsonArray = notJsonService.readJsonFile();
//        System.out.println(jsonArray.toString());
//        return jsonArray.toString();
//    }

    @GetMapping("/readjsonfile")
    public void readjsonfile() throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().println(notJsonService.readJsonFile());
    }

}
