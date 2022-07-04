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
import java.time.format.DateTimeFormatter;


@Service
public class JsonService {


    public boolean getjsonFromServer(){    // json파일 다운로드 해오는 메서드

        ///////////////////////////////////////////// 이하 정상 작동하는 코드. 병합할때 주석 풀고 사용할것

        String url = "https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json";
        URI uri = URI.create(url);
        System.out.println("autoUpdateJson(), uri : "+uri.toString());    // @삭제

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(uri,String.class);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String nowDate = dtf.format(LocalDate.now());

        // 배포할 때 서버 경로로 바꿔야 함. @수정
        String dir = "C:\\Users\\XPS_15\\inteliJ.git\\mpox\\src\\main\\resources\\static\\json";
        try {
//            File file = File.createTempFile(nowDate+"_jsonData",".json", new File(dir));
                    // 임의의 파일명 자동 생성, 덮어씌워져도 딱히 문제될건 없어보임. 나중에 @삭제
            File file = new File(dir,nowDate+".json");
            FileOutputStream fos =new FileOutputStream(file);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            bos.write(result.getBody().getBytes(StandardCharsets.UTF_8));

            bos.close();
            fos.close();
        } catch (IOException e) {
            System.out.println("StoringService_autoUpdateJson()_exception : "+e);
            return false;
        }
        return true;
    }

    // db 필요없음. @삭제
    public boolean savejsontosql(){    // json파일 다운로드 해오는 메서드

//        String url = "https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json";
//        URI uri = URI.create(url);
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> result = restTemplate.getForEntity(uri,String.class);
//        JSONArray jsonArray = new JSONArray(result.getBody());
//        JSONObject iso2Object = readjsonObjectFile("iso3toiso2");       // iso2자리 코드로 변환하기 위한 json오브젝트
//        JSONObject koreanObject = readjsonObjectFile("iso3tokorean");   // 우리말 국가명으로 변환하기 위한 json오브젝트
//        List<JsonEntity> jsonEntities = new ArrayList<>();
//
//        for(int i=0; i< jsonArray.length(); i++){
//
//            JSONObject jsonObject = jsonArray.optJSONObject(i);
//            byte tmpByte;
//            String tmpString= jsonObject.optString("Status");
//
//            if (tmpString.equals("confirmed")) tmpByte=1;
//                else if (tmpString.equals("suspected")) tmpByte=2;
//                else tmpByte=-1;
//
//            jsonEntities.add(JsonEntity.builder()
//                    .id(jsonObject.getInt("ID"))
//                    .status(tmpByte)
//                    .country(koreanObject.optString(jsonObject.optString("Country_ISO3")))
//                    .countryISO2(iso2Object.optString(jsonObject.optString("Country_ISO3")))
//                    .source(jsonObject.optString("Source"))
//                    .dateEntry(jsonObject.optString("Date_entry"))
//                    .build());
//        }
//
//        jsonRepository.saveAll(jsonEntities);
        return true;
    }

    public JSONArray readjsonArrayFile(String jsonFileName){

        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json/";


        File file = new File(dir+jsonFileName+".json");
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
    public JSONArray readjsonArrayFile(){
        byte failCount=0;
        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json";

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String nowDate = dtf.format(LocalDate.now());
        File file = new File(dir+"/"+nowDate+".json");
        System.out.println(!file.isFile());
        if( ! file.isFile() ) {        // 만약 해당 날짜의 json파일이 없다면 ->> 날짜가 바뀌었다면
            System.out.println(1);
            while (failCount<2){   // 2회 반복
                System.out.println(2);
                getjsonFromServer();
                if (file.isFile()) {    // 파일이 정상적으로 생성되었다면 while문 탈출
                    break;
                }
                else {                  // 그렇지 않다면 1초 대기 후 다시 실행
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {throw new RuntimeException(e);}
                    failCount++;
                }
            }
        }
        try {
            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            byte[] bytes = new byte[fis.available()];
            bis.read(bytes);

            bis.close();
            fis.close();
            JSONArray jsonArray = new JSONArray(new String(bytes));

            return jsonArray;
        }catch (Exception e){System.out.println("readJsonFile()_exception : "+e);}

        return new JSONArray();
    }
    public JSONObject readjsonObjectFile(String jsonFileName){

        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json/";

        File file = new File(dir+jsonFileName+".json");
        byte[] bytes = new byte[0];
        try {
            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            bytes = new byte[fis.available()];
            bis.read(bytes);

            bis.close();
            fis.close();
        }catch (Exception e){System.out.println("readJsonFile()_exception : "+e);}

        return new JSONObject(new String(bytes));
    }

}
