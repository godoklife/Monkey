package com.monkey.mpox.dto.statistics;

import lombok.*;

@Getter @Builder @ToString
@AllArgsConstructor
public class CommonChartData {
    private String status;    //
    private String country; // 국가명
    private String countryISO2; // ISO3166 2자리 코드
    private String source;  // 출처
    private String date;   // 데이터 입력일
}
