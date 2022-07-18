package com.monkey.mpox.controller;

import com.monkey.mpox.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class NewsController {

    @Autowired private NewsService newsService;

    @GetMapping("/getnews")
    public void getnews(HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(newsService.getnews());
        }catch(Exception e){

        }

    }

    @GetMapping("/getennews")
    public void getennews(HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(newsService.getennews());
        }catch(Exception e){

        }
    }

    @GetMapping("/getjpnews")
    public void getjpnews(HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(newsService.getjpnews());
        }catch(Exception e){

        }
    }

    @GetMapping("/getcnnews")
    public void getcnnews(HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(newsService.getcnnews());
        }catch(Exception e){

        }
    }

    /*    @GetMapping("/getyoutubeurl") 대기
    public String getyoutubeur(HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            *//*response.getWriter().print(newsService.getyoutubeurl());*//*
            String temp = newsService.getyoutubeurl();
            return temp;
        }catch (Exception e) {
            System.out.println("con에러" + e);
        }
        return null;
    }
    */

}
