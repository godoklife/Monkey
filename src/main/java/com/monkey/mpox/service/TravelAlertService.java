package com.monkey.mpox.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

@Service
public class TravelAlertService {

    // 외교부 여행경보 JOSN 받아오기
    public JSONObject getTravelAlert(){
        try {
            //키값
            String key = "DQP%2FRXHwbnss9z6uetsFIxyUiC3xGjYC9cbN5y8eOsTadE1xaSfv23sLcDyjJj85EwAQtLwV7%2B%2FB4jVCC%2FSraQ%3D%3D";

            // JSON 가져오기
            URL url = new URL("http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey="+key+"&numOfRows=200");
            // UTF-8로 openStrieam해서 읽어오기
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            String result = bf.readLine(); // result 변수의 저장
            JSONObject object = new JSONObject(result); // JOSN확인
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            JSONArray jsonArray = object.getJSONArray("data"); // object 안 data 리스트로 뽑기
            
            return object;
        }catch (Exception e){
            System.out.println("JSON 읽어오기 실패: " + e );
        }
        return null;
    }

}
