package com.monkey.mpox.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.jsonschema.JsonSchema;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

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

            String site = element.select(".news_tit").attr("href"); // 링크
            String tt = element.select(".news_tit").attr("title"); // 제목
            String txt = element.select(".dsc_txt_wrap").text(); // 내용
            String img =element.select(".api_get").attr("src"); // 이미지 링크

            if(site == "" || tt == "" || txt == ""){

            }else {
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

    // 유튜브 크롤링 대기
/*    public JSONArray getyoutubeurl() {
        try{
            String apiurl = "https://www.googleapis.com/youtube/v3/search";
            apiurl += "?key=AIzaSyDWHeAefu91RUrXLwMgd2MNm_xmyFlaQBY";
            apiurl += "&part=snippet&type=video&maxResults=5&videoEmbeddable=true";
            apiurl += "&q="+ URLEncoder.encode("원숭이두창","UTF-8");

            URL url = new URL(apiurl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            JSONArray jsonArray = new JSONArray(response);
            return jsonArray;
        }catch(Exception e){e.printStackTrace();}
        return null;

    }*/

}
