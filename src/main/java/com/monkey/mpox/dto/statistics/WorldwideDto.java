package com.monkey.mpox.dto.statistics;

import lombok.*;

import java.util.List;

@Getter@Setter@Builder@ToString
@AllArgsConstructor@NoArgsConstructor
public class WorldwideDto {
    private int confirmed;
    private int suspected;
    private List<String> countryList;
    private int countryCount;


}
