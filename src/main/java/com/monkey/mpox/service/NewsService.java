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

}
