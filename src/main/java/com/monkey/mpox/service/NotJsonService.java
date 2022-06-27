package com.monkey.mpox.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Service
public class NotJsonService {
    public boolean autoUpdateJson(){    // json파일 다운로드 해오는 메서드

        ///////////////////////////////////////////// 이하 정상 작동하는 코드. 병합할때 주석 풀고 사용할것

//        String url = "https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json";
//        URI uri = URI.create(url);
//        System.out.println("autoUpdateJson(), uri : "+uri.toString());    // @삭제
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> result = restTemplate.getForEntity(uri,String.class);
//
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
//        String nowDate = dtf.format(LocalDate.now());
//
//        // 배포할 때 서버 경로로 바꿔야 함. @수정
//        String dir = "C:\\Users\\XPS_15\\inteliJ.git\\mpox\\src\\main\\resources\\static\\json";
//        try {
////            File file = File.createTempFile(nowDate+"_jsonData",".json", new File(dir));
//                    // 임의의 파일명 자동 생성, 덮어씌워져도 딱히 문제될건 없어보임. 나중에 @삭제
//            File file = new File(dir,nowDate+".json");
//            FileOutputStream fos =new FileOutputStream(file);
//            BufferedOutputStream bos = new BufferedOutputStream(fos);
//            bos.write(result.getBody().getBytes(StandardCharsets.UTF_8));
//
//            bos.close();
//            fos.close();
//        } catch (IOException e) {
//            System.out.println("StoringService_autoUpdateJson()_exception : "+e);
//            return false;
//        }
        return true;
    }
    public JSONArray readJsonFile(){

        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json";

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String nowDate = dtf.format(LocalDate.now());
//        File file = new File(URI.create(dir+"/"+nowDate+".json"));    // ??? path가 아니라 URI 지정해줘야하는거 아님?????
        File file = new File(dir+"/"+nowDate+".json");
        byte[] bytes = new byte[0];
        try {
            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            bytes = new byte[fis.available()];
            bis.read(bytes);

            bis.close();
            fis.close();
        }catch (Exception e){System.out.println("readJsonFile()_exception : "+e);}

        JSONArray jsonArray = new JSONArray(new String(bytes));

        return jsonArray;
    }

}
