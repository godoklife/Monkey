package com.monkey.mpox.dto.statistics;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter @Builder @ToString
public class GeoChartData {
    private int confirmedCount;
    private int suspectedCount;
    private String country;
    private String countryISO2;
    private String date;

}
