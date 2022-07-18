package com.monkey.mpox.service;

import com.monkey.mpox.dto.statistics.CommonChartData;
import com.monkey.mpox.dto.statistics.GeoChartData;
import com.monkey.mpox.dto.statistics.WorldwideDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class StatisticsService {

    WorldwideDto todayWorldWideDto;
    List<CommonChartData> commonChartDataList = new ArrayList<>();  //putCommonChartDataList()에서 데이터 삽입
    List<GeoChartData> geoChartDataList = new ArrayList<>();         //putGeoChartDataList()에서 데이터 삽입
    List<String>countryList = new ArrayList<>();                    //putCommonChartDataList()에서 데이터 삽입

    @Value("${application.jsonPath}")
    String dir;


    public void selectlanguage(){
        commonChartDataList.clear();
    }


    public boolean loadData(String language){

        boolean flag1 = getjsonFromServer();
            // @@@@@@@@@@@ 나중에 다시 열어놓을것, 반복적으로 다운로드하면 혼날까봐 잠깐 막음 @@@@@@@@@@@
//        boolean flag1 = true;
        boolean flag2 = putCommonChartDataList(language);

        if(flag1 && flag2)
            return true;
        else
            return false;
    }

    // json 파일을 서버로부터 다운로드 해오는 메소드
        // 중복되는 파일명이 있을 경우 덮어씌움.
    public boolean getjsonFromServer(){
        if( ! commonChartDataList.isEmpty()){   // 새로고침 눌렀을 때 중복실행 방지
            return true;
        }
        String url = "https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json";
        URI uri = URI.create(url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(uri,String.class);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String nowDate = dtf.format(LocalDate.now());
        // todo: 배포할 때 경로 수정 요



//        String dir = "C:\\Users\\XPS_15\\inteliJ.git\\mpox\\src\\main\\resources\\static\\json";
        try {
            File file = new File(dir,nowDate+".json");
            FileOutputStream fos =new FileOutputStream(file);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            bos.write(result.getBody().getBytes(StandardCharsets.UTF_8));

            bos.close();
            fos.close();
            return true;
        } catch (IOException e) {
            System.out.println("StoringService_autoUpdateJson()_exception : "+e);
            return false;
        }
    }

    // 1. 오늘 날짜 이름을 가진 .json 파일을 읽어서
    //      1-1) 만약 해당 파일이 없다면 getjsonFromServer() 호출 -> json파일 소스에서 다운로드
    // 2. JSONArray 형태로 변환 후 리턴
    public JSONArray readjsonArrayFile(){
        byte failCount=0;
//        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json";

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String nowDate = dtf.format(LocalDate.now());
        File file = new File(dir+"/"+nowDate+".json");
        if( ! file.isFile() ) {        // 만약 해당 날짜의 json파일이 없다면 ->> 날짜가 바뀌었다면
            System.out.println("readjsonArrayFile() : ["+nowDate+".json] 이 없습니다. 소스에서 다운로드 시작");
            while (failCount<2){   // 2회 반복
                System.out.println("readjsonArrayFile() : 파일 다운로드 실패, "+(failCount+1)+"번째 재시도...");
                getjsonFromServer();
                if (file.isFile()) {    // 파일이 정상적으로 생성되었다면 while문 탈출
                    break;
                }
                else {                  // 실패했다면 3초 대기 후 다시 실행
                    try {
                        Thread.sleep(3000);
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
    public JSONArray readjsonArrayFile(String jsonFileName){

//        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json/";


        File file = new File(dir+"/"+jsonFileName+".json");
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
    }   // 삭제 ㄴㄴ 쓸곳있음 수도...
    public JSONObject readjsonObjectFile(String jsonFileName){

        // todo: 배포시 경로 변경 요
//        String dir = "C:/Users/XPS_15/inteliJ.git/mpox/src/main/resources/static/json/";

        File file = new File(dir+"/"+jsonFileName+".json");
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


    // json을 List<CommonChartData> 형태로 메모리에 적재
        // 1. 파일처리된 json을 JSONArray로 읽어들이고
            // (1) 날짜별 감염자 리스트 (2) 국가 3자리코드-> 2자리코드 변환용 json (3) 국가 3자리코드 -> 우리말 변환용 json
        // 2. 국가 코드를 변환 후
        // 3. JSONObject 단위로 List에 add
    public boolean putCommonChartDataList(String language){
        if( ! commonChartDataList.isEmpty()){   // 새로고침 눌렀을 때 중복실행 방지
            return true;
        }
        try {
            JSONArray todayjsonArray = readjsonArrayFile();
            JSONObject iso2Object = readjsonObjectFile("iso3toiso2");
            JSONObject languageobject = null;
            if(language.equals("kr")){
                languageobject = readjsonObjectFile("iso3tokorean");
            }else if(language.equals("en")){
                languageobject = readjsonObjectFile("iso3toenglish");
            }else if(language.equals("zh")){
                languageobject = readjsonObjectFile("iso3tochinese");
            }else if(language.equals("ja")){
                languageobject = readjsonObjectFile("iso3tojapanese");
            }else{ return false; }

            for(int i=0; i<todayjsonArray.length(); i++){
                JSONObject tmpObject =  todayjsonArray.getJSONObject(i);
                CommonChartData tmpChartData = CommonChartData.builder()
                        .status( tmpObject.getString("Status"))
                        .country(languageobject.getString(tmpObject.getString("Country_ISO3")))
                        // iso3306 3자리코드 -> 우리말 국가명으로 변환
                        .countryISO2( iso2Object.getString(tmpObject.getString("Country_ISO3")))
                        // iso3306 3자리코드 -> iso3306 2자리코드로 변환
                        .source( tmpObject.getString("Source"))
                        .date( tmpObject.getString("Date_entry"))
                        .build();
                commonChartDataList.add(tmpChartData);
            }
            return true;
        }catch (Exception e) {System.out.println("putCommonChartDataList_Exception : "+e);}
        return false;
    }


    // 확진자가 있는 국가명 만을 뽑아오는 메서드
    public void putCountryList(){
        TreeSet<String> set = new TreeSet<>();
        for(int i=0; i<commonChartDataList.size(); i++){
            set.add(commonChartDataList.get(i).getCountry());
        }
        countryList = new ArrayList<>(set);
    }

    // 오늘의 json파일(파일명 형식:yyyyMMdd.json)을 해석해서 Dto에 저장
        // 현재 getww()가 호출시 getData()도 실행되는 구조임.
        // :Todo 나중에 getData()는 일정시간마다->> 매 02시쯤? 실행되도록 @수정 필요
        // 22.06.30 00:55 json파일 읽는 시점에 파일이 없을경우 서버에서 불러오도록 로직 수정됨
    public void getData(){
        JSONArray todayjsonArray = readjsonArrayFile();
        int confirmedData=0;
        int suspectedData=0;
        Set<String> tmpSet = new HashSet<>();   // 중복값 제거키 위한 Set 사용
        for(int i=0; i< todayjsonArray.length(); i++){
            JSONObject tmp = (JSONObject) todayjsonArray.get(i);

            if (tmp.get("Status").equals("confirmed")){confirmedData++;}
            else if (tmp.get("Status").equals("suspected")){suspectedData++;}

            tmpSet.add((String) tmp.get("Country_ISO3"));
        }
        List<String> countryList = new ArrayList<String>(tmpSet);   // Set-> List 변환
        JSONObject countryName = readjsonObjectFile("iso3tokorean");
        for(int i=0; i<countryList.size(); i++){
          countryList.set(i, (String) countryName.get(countryList.get(i))); // 리스트에 담긴 국가명 한글화(json->List)
        }
        Collections.sort(countryList);  // 국가명 가나다순 정렬

        todayWorldWideDto = new WorldwideDto(confirmedData,suspectedData,countryList,countryList.size());
            // 메모리에 싣기
    }

    // 호출시 WorldwideDto를 json배열화 해서 리턴하는 메서드
    public JSONObject getww(){
        // 현재 사용자가 geodata를 요청했는데 메모리에 json이 적재되어 있지 않으면 불러오는 구조임.
        // todo: 일정 시간이 되면 자동으로 업데이트 되도록 바꾸어야 함.
        if(todayWorldWideDto==null){
            getData();
        }
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        for(int i=0; i< todayWorldWideDto.getCountryCount(); i++){ // 발병국명단List -> jsonArray에 담기 위한 반복문
            jsonObject.put(i+"",todayWorldWideDto.getCountryList().get(i));
        }
        jsonArray.put(jsonObject);

        jsonObject = new JSONObject();
        jsonObject.put("확진자", todayWorldWideDto.getConfirmed());
        jsonObject.put("유증상자", todayWorldWideDto.getSuspected());
        jsonObject.put("발병국명단", jsonArray);
        jsonObject.put("발병국가수", todayWorldWideDto.getCountryCount());
//        putCommonChartDataList();
//        putCountryList();
        return jsonObject;
    }

    // 국가별 총 확진자, 유증상자 데이타 집계 후 Map 형태로 리턴
    public Map getSortedByDate(){

        // 만들고자 하는 형식
        // [ { 2022-05-18 : { KR : [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] ,
        //                  { JP : [ { 국가명 : 일본 }, { 확진자 : 30 }, { 유증상자 : 100 } ] } } ,
        //
        //   { 2022-05-19 : { KR : [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] ,
        //                  { JP : [ { 국가명 : 일본 }, { 확진자 : 30 }, { 유증상자 : 100 } ] },
        //                  { CN : [ { 국가명 : 중국 }, { 확진자 : 30 }, { 유증상자 : 100 } ] } }
        // ]

        Map<String, Map<String, Map<String, List<Map>>> > 메모리 = new HashMap<>();  // 날짜 : value 를 담을 map

        Map<String, Map<String, List<Map>>> 날짜 = new HashMap<>();  // 날짜 : value 를 담을 map
        Map<String, List<Map>> 코드명= new HashMap<>();   // isocode2 : value 를 담을 map

        List<Map> 맵을담은리스트 = new ArrayList<>();
        // [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] 를 구현할 때 사용할 List

        Map<String, Integer> 확진자 = new HashMap<>();   // 확진자 를 담을 map
        Map<String, Integer> 유증상자 = new HashMap<>();   // 유증상자 를 담을 map
        Map<String, String> 한글국가명 = new HashMap<>();  // 국가명 를 담을 map

        int totalConfirmed=0;
        int totalsuspected=0;

        for (int i=0; i<commonChartDataList.size(); i++) {

            String date = commonChartDataList.get(i).getDate();
            String iso = commonChartDataList.get(i).getCountryISO2();
            String country = commonChartDataList.get(i).getCountry();
            String status = commonChartDataList.get(i).getStatus();
            if (i == 0) {
                if (commonChartDataList.get(i).getStatus().equals("confirmed")) {
                    확진자.put("확진자", 1);
                    유증상자.put("유증상자", 0);
                } else if (commonChartDataList.get(i).getStatus().equals("suspected")) {
                    확진자.put("확진자", 0);
                    유증상자.put("유증상자", 1);
                }
                한글국가명.put("국가명", commonChartDataList.get(i).getCountry());
                맵을담은리스트.add(0, 한글국가명);
                맵을담은리스트.add(1, 확진자);
                맵을담은리스트.add(2, 유증상자);
                코드명.put(commonChartDataList.get(i).getCountryISO2(), 맵을담은리스트);
                날짜.put(commonChartDataList.get(i).getDate(), 코드명);
                메모리.put("data", 날짜);

            }else {

                if ( 메모리.get("data").keySet().contains(date) ) {    // 메모리map에 해당 날짜가 있는지 확인

                    if (메모리.get("data").get(date).containsKey(iso)){    //

                        if (status.equals("confirmed")) {

                            int i1 = (int) 메모리.get("data").get(date).get(iso).get(1).get("확진자");
                            메모리.get("data").get(date).get(iso).get(1).put("확진자" , i1+1 );
                            totalConfirmed++;
                        } else if (status.equals("suspected")) {

                            int i1 = (int) 메모리.get("data").get(date).get(iso).get(2).get("유증상자");
                            메모리.get("data").get(date).get(iso).get(2).put("유증상자" , i1+1 );
                            totalsuspected++;
                        }

                    }else {
                        코드명 = new HashMap<>();   // isocode2 : value 를 담을 map

                        맵을담은리스트 = new ArrayList<>();
                        // [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] 를 구현할 때 사용할 List

                        확진자 = new HashMap<>();   // 확진자 를 담을 map
                        유증상자 = new HashMap<>();   // 유증상자 를 담을 map
                        한글국가명 = new HashMap<>();  // 국가명 를 담을 map

                        if (status.equals("confirmed")) {
                            확진자.put("확진자", 1);
                            유증상자.put("유증상자", 0);
                            totalConfirmed++;
                        } else if (status.equals("suspected")) {
                            확진자.put("확진자", 0);
                            유증상자.put("유증상자", 1);
                            totalsuspected++;
                        } else {
                            확진자.put("확진자",0);
                            유증상자.put("유증상자",0);
                        }
                        한글국가명.put("국가명", country);
                        맵을담은리스트.add(0, 한글국가명);
                        맵을담은리스트.add(1, 확진자);
                        맵을담은리스트.add(2, 유증상자);
                        코드명.put(iso, 맵을담은리스트);
                        메모리.get("data").get(date).putAll(코드명);

                    }

                } else { // 동일 날짜가 아니라면

                    날짜 = new HashMap<>();  // 날짜 : value 를 담을 map
                    코드명= new HashMap<>();   // isocode2 : value 를 담을 map

                    맵을담은리스트 = new ArrayList<>();
                    // [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] 를 구현할 때 사용할 List

                    확진자 = new HashMap<>();   // 확진자 를 담을 map
                    유증상자 = new HashMap<>();   // 유증상자 를 담을 map
                    한글국가명 = new HashMap<>();  // 국가명 를 담을 map

                    if (status.equals("confirmed")) {
                        확진자.put("확진자", 1);
                        유증상자.put("유증상자", 0);
                        totalConfirmed++;
                    } else if (status.equals("suspected")) {
                        확진자.put("확진자", 0);
                        유증상자.put("유증상자", 1);
                        totalsuspected++;
                    } else {
                        확진자.put("확진자",0);
                        유증상자.put("유증상자",0);
                    }

                    한글국가명.put("국가명",country);
                    맵을담은리스트.add(0, 한글국가명);
                    맵을담은리스트.add(1, 확진자);
                    맵을담은리스트.add(2, 유증상자);
                    코드명.put(iso, 맵을담은리스트);
                    날짜.put(date, 코드명);
                    메모리.get("data").putAll( 날짜 );
                }
            }
        }
//        메모리.get("data").put("총확진자",totalConfirmed);
//        메모리.get("data").put("총확진자",totalsuspected);


        return 메모리;
    }

    public JSONArray getSortedByCountry(){



        // 만들고자 하는 json 형태
        // [ { 코드 : KR , 국가명 : 대한민국 , 확진자 : 10 }  ,
        //   { 코드 : CN , 국가명 : 중국 , 확진자 : 10,000 } ]
        int totalConfirmed = 0; // 총 확진자수
        int totalSuspected = 0; // 총 유증상자수
        JSONArray jsonArray = new JSONArray();

        TreeSet<String> set = new TreeSet<>();// 중복값 걸러내기용
        for (int i=0; i<commonChartDataList.size(); i++){
            set.add(commonChartDataList.get(i).getCountryISO2());
        }

        List<String> isoList = new ArrayList<>(set);    // 중복없는 iso 목록 담겨있음

        for (int i=0; i<isoList.size(); i++){
            JSONObject object = new JSONObject();
            object.put("확진자",0);
            object.put("유증상자",0);
            object.put("국가명","");
            object.put("ISO",isoList.get(i));
            jsonArray.put(object);
        }

        for (int i=0; i<commonChartDataList.size(); i++){
            String date = commonChartDataList.get(i).getDate();
            String iso = commonChartDataList.get(i).getCountryISO2();
            String country = commonChartDataList.get(i).getCountry();
            String status = commonChartDataList.get(i).getStatus();
            for(int j=0; j< jsonArray.length(); j++) {
                if (jsonArray.getJSONObject(j).get("ISO").equals(iso)) {    // 동일한 iso코드가 담긴 오브젝트를 찾아서
                    if(status.equals("confirmed")){ // 집어넣어야 할 데이타가 확진자인지 유증상자인지 구분 후
                        int tmp = jsonArray.getJSONObject(j).getInt("확진자");
                        jsonArray.getJSONObject(j).put("확진자",tmp+1);    // 카운트업
                    }else if(status.equals("suspected")){
                        int tmp = jsonArray.getJSONObject(j).getInt("유증상자");
                        jsonArray.getJSONObject(j).put("유증상자",tmp+1);
                    }
                    jsonArray.getJSONObject(j).put("국가명",country);
                    totalConfirmed++;
                }
            }
        }

        // 비감염자(status.equals("discarded")) 또는 에러코드만(omit_error) 있는 국가 제거
        for(int i= jsonArray.length()-1;i>=0; i--){
            if(jsonArray.getJSONObject(i).getInt("확진자")==0 &&
                    jsonArray.getJSONObject(i).getInt("유증상자")==0){
                jsonArray.remove(i);
            }
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("확진자총합",totalConfirmed);
        jsonArray.put(jsonObject);

        return jsonArray;
    }

    // 확인날짜별 확진자 유증상자 jsonArrlist
/*    public JSONArray getstautdata() {
        try {
            JSONArray todayjsonArray = readjsonArrayFile();
            JSONArray array = new JSONArray(); // json 가공값
            for(int i = 0 ; i < todayjsonArray.length(); i ++){
                JSONObject jsonObject = todayjsonArray.getJSONObject(i); // i번째 jsonobject 추출
                JSONObject object = new JSONObject();
                // 중복키가 있을경우
                array.get

            }

        }catch (Exception e){
            System.out.println("서비스 getstautdata에러: " e);
        }
    }*/

}

