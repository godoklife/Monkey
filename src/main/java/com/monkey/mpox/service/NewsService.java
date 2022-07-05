package com.monkey.mpox.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.json.JSONArray;
import org.json.JSONObject;
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

//        Document doc = Jsoup.connect(Monkey_Pox_News).get();
//        Elements elements = doc.select("div.group_news");
//
//        for(Element element : elements) {
//            Elements newscontent = element.select("div.news_area");
//
//            News news = News.builder()
//                    .title(element.select("a.news_tit").text())
//                    .text(element.select("div.dsc_wrap").text())
//                    .build();
//
//            System.out.println(news.toString());


        // JSONObject siteDataMain = new JSONObject();
// 크롤링 내용 JSON화 시키기 위해 반복적으로 많기 때매 JsonArray로
        // JSONArray siteJsonArray = new JSONArray();
        Document doc2 = Jsoup.connect(
                        "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%9B%90%EC%88%AD%EC%9D%B4%EB%91%90%EC%B0%BD")
                .get();

        Elements posts = doc2.body().getElementsByClass("list_news");
        Elements file = posts.select("li");
//        System.out.println(file.toString());
        //int j = 8;

        for (Element element : file) {


            String site = element.select(".news_tit").attr("href");
            String tt = element.select(".news_tit").attr("title");
            String txt = element.select(".dsc_txt_wrap").text();
//            String img =element.select(".news_wrap").attr("img");

            if(site == "" || tt == "" || txt == ""){

            }else {
                JSONObject newsobject = new JSONObject();
                newsobject.put("link", site);
                newsobject.put("title", tt);
                newsobject.put("txt", txt);
//                newsobject.put("img", img);
                newsarray.put(newsobject);
            }


            //j++;
            System.out.println(site);
            System.out.println(tt);
            System.out.println(txt);
//            System.out.println(img);
            //System.out.println(newsarray);
            //if (j == 8) {break;}
        }

//        for (Element element : file) {
//            JSONObject siteJsonObject = new JSONObject();
//
//            element.select(".news_tit").attr("href");
//            element.select(".news_tit").text();
//            element.select(".dsc_txt_wrap").text();
//            j++;
//        }
        return newsarray;
    }

//        String title = elements.select("a.news_tit").text();
//        String text = elements.select("div.dsc_wrap").text();
//        String href = elements.select("href").text();
//
//        System.out.println(title);
//        System.out.println(text);
//        System.out.println(href);
//        System.out.println("============");


}
