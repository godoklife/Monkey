package com.monkey.mpox.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NewsService {
    @PostConstruct
    public static JSONArray getnews() throws IOException {


        JSONArray newsarray = new JSONArray();

        Document doc2 = Jsoup.connect(
                        "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%9B%90%EC%88%AD%EC%9D%B4%EB%91%90%EC%B0%BD")
                .get();

        Elements posts = doc2.body().getElementsByClass("list_news");
        Elements file = posts.select("li");

        for (Element element : file) {

            String site = element.select(".news_tit").attr("href");
            String tt = element.select(".news_tit").attr("title");
            String txt = element.select(".dsc_txt_wrap").text();

            if(site == "" || tt == "" || txt == ""){

            }else {
                JSONObject newsobject = new JSONObject();
                newsobject.put("link", site);
                newsobject.put("title", tt);
                newsobject.put("txt", txt);
                newsarray.put(newsobject);
            }

        }

        return newsarray;
    }


    @PostConstruct
    public  JSONArray getennews() throws IOException{
        JSONArray newsarray = new JSONArray();

        Document doc2 = Jsoup.connect(
                        "https://www.bbc.co.uk/search?q=monkeypox&page=1")
                .get();

        Elements posts = doc2.body().getElementsByClass("ssrcss-1020bd1-Stack");
        Elements file = posts.select("li");

        for (Element element : file) {

            String site = element.select(".ssrcss-1ynlzyd-PromoLink").attr("href"); // 링크
            String tt = element.select(".ssrcss-6arcww-PromoHeadline").text();; // 제목
            String txt = element.select(".ssrcss-1q0x1qg-Paragraph").text(); // 내용
            String img = element.select(".ssrcss-evoj7m-Image").attr("src"); // 이미지 링크

            if (site == "" || tt == "" || txt == "") {

            } else {
                JSONObject newsobject = new JSONObject();
                newsobject.put("link", site);
                newsobject.put("title", tt);
                newsobject.put("txt", txt);
                newsobject.put("img", img);
                newsarray.put(newsobject);
            }

        }

        return newsarray;
    }


    @PostConstruct
    public  JSONArray getjpnews() throws IOException{
        JSONArray newsarray = new JSONArray();

        Document doc2 = Jsoup.connect(
                        "https://news.yahoo.co.jp/search?p=%E3%82%B5%E3%83%AB%E7%97%98&fr=top_ga1_sa&ei=UTF-8&ts=357&aq=-1&x=nl")
                .get();

        Elements posts = doc2.body().getElementsByClass("newsFeed_list");
        Elements file = posts.select("li");

        int count=0;
        for (Element element : file) {
            if(count==12){
                return newsarray;
            }
            String site = element.select(".newsFeed_item_link").attr("href"); // 링크
            String tt = element.select(".newsFeed_item_title").text();; // 제목
            String txt = element.select(".sc-kcyqVo").text(); // 내용
            String img = element.select(".sc-cHGsZl").attr("src"); // 이미지 링크

            if (site == "" || tt == "" || txt == "") {

            } else {
                JSONObject newsobject = new JSONObject();
                newsobject.put("link", site);
                newsobject.put("title", tt);
                newsobject.put("txt", txt);
                newsobject.put("img", img);
                newsarray.put(newsobject);
            }
            count++;
        }

        return newsarray;
    }

    @PostConstruct
    public  JSONArray getcnnews() throws IOException{
        JSONArray newsarray = new JSONArray();

        Document doc2 = Jsoup.connect(
                        "https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&ie=utf-8&word=%E7%8C%B4%E7%97%98")
                .get();

        Elements posts = doc2.select("#content_left");
        Elements file = posts.select("div.result-op");

        for (Element element : file) {

            String site = element.select(".news-title-font_1xS-F").attr("href"); // 링크
            String tt = element.select(".news-title-font_1xS-F").text(); // 제목
            String txt = element.select(".c-font-normal").text(); // 내용
            String img = element.select(".c-img").attr("src"); // 이미지 링크

            if (site == "" || tt == "" || txt == "") {

            } else {
                JSONObject newsobject = new JSONObject();
                newsobject.put("link", site);
                newsobject.put("title", tt);
                newsobject.put("txt", txt);
                newsobject.put("img", img);
                newsarray.put(newsobject);
            }
        }

        return newsarray;
    }

}
