

let jsondata // json 저장
//데이터가져오기
function getdataDate(){
    $.ajax({
        url:'/statistics/getdatadate',
        async: false,
        success:function (jsonarray){
            const ordered = {};
            Object.keys(jsonarray.data).sort().forEach(function (key){
                ordered[key] = jsonarray.data[key];
            });
            jsondata = ordered;
            /* let dataKeys = Object.keys(geochartArray['data']);
             for(let i=0; i< dataKeys.length; i++){
                 let datakey = dataKeys[i]
                    /!* console.log(datakey+' : '+geochartArray['data'][datakey])*!/
                 let countrykeys = Object.keys(geochartArray['data'][datakey]);
                 for (let j=0; j<countrykeys.length; j++){
                     let countrykey = countrykeys[j];
                     /!*console.log(countrykey+' : '+geochartArray['data'][datakey][countrykey]);*!/
                 }
             }
            console.log(dataKeys);*/

        }
    });
}
// 차트
am5.ready(function() {
    getdataDate(); // json 추출 함수 호출


    getchartdiv1(1);
}); // end am5.ready()

function setchartdiv1(setno){
    root2.dispose();
    getchartdiv1(setno);
}



function getchartdiv1(setno) {
    // Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
   root2 = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root2.setThemes([
        am5themes_Animated.new(root2)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root2.container.children.push(am5xy.XYChart.new(root2, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
    }));

    chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root2, {}));
    cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root2, {
        maxDeviation: 0.3,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root2, {}),
        tooltip: am5.Tooltip.new(root2, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root2, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root2, {})
    }));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root2, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root2, {
            labelText: "{valueY}"
        })
    }));
    series.strokes.template.setAll({
        strokeWidth: 2,
        strokeDasharray: [3, 3]
    });

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
    series.bullets.push(function(root2, series, dataItem) {
        if (dataItem.dataContext.bullet) {
            var container = am5.Container.new(root2, {});
            var circle0 = container.children.push(am5.Circle.new(root2, {
                radius: 5,
                fill: am5.color(0xff0000)
            }));
            var circle1 = container.children.push(am5.Circle.new(root2, {
                radius: 5,
                fill: am5.color(0xff0000)
            }));

            circle1.animate({
                key: "radius",
                to: 20,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });
            circle1.animate({
                key: "opacity",
                to: 0,
                from: 1,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });

            return am5.Bullet.new(root2, {
                sprite: container
            })
        }
    })

// Set data
    var data  = [];

    if(setno === 1){
        // 일별
        for(let i = 0; i < Object.keys(jsondata).length; i++){ // jsondata만큼반복
            // 날짜 분리
            let datea = Object.keys(jsondata)[i]; // key 날짜
            /!*console.log(jsondata.data[date]);*!/
            let datevnum = Object.keys(jsondata[datea]).length;
            /!*Object.keys(jsondata.data[date])[0]*!/
            // 총 하기
            let datevalu = 0;
            for(let j = 0 ; j < datevnum; j++){
                datevalu += jsondata[datea][Object.keys(jsondata[datea])[j]]["1"]["확진자"];
            }
            if(i === Object.keys(jsondata).length - 1){
                data[i] = { date : new Date(datea).getTime()
                    , value : datevalu
                    ,bullet: true};
            }else{
                data[i] = { date : new Date(datea).getTime()
                    , value : datevalu};
            }
        }
    }else if(setno === 2){  // 월별

        let month = [];
        let monthobject = [];
        //월별
        for(let i = 0; i < Object.keys(jsondata).length; i++) { // jsondata만큼반복
            let datesd = Object.keys(jsondata)[i]; // key 날짜
            let monthnum = new Date(datesd).getMonth();
            if(month.indexOf(monthnum) === -1){// 해당 달이 배열의 없다면
                month.push(monthnum);
            }
        }
        let con = 0;
        for( let i = 0 ; i < month.length ; i++ ){ // 월수 만큼 반복
            let daydate = 0; // 일일 데이터
            let year;
            //월별 확진자구하기
            for(let j = 0; j < Object.keys(jsondata).length ; j++){ // 데이터길이만큼 반복
                let datea = Object.keys(jsondata)[j]; // key 날짜
                let monthnum = new Date(Object.keys(jsondata)[j]).getMonth();// 해당월 구하기
                if(month[i] === monthnum){ // 해당월이라면
                    for(let z = 0 ; z <  Object.keys(jsondata[datea]).length; z++){
                        daydate += jsondata[datea][Object.keys(jsondata[datea])[z]]["1"]["확진자"];
                        year = new Date(datea).getFullYear();
                    }
                }

            }
            let newob = { [year+"-"+month[i]+"-1"] : daydate }
            monthobject.push(newob);
        }
        for(let i = 0; i < monthobject.length ; i++){
            if(i === monthobject.length - 1){

                data[i] = { date : new Date(Object.keys(monthobject[i])).getTime(),
                    value : monthobject[i][Object.keys(monthobject[i])]
                    ,bullet : true};
            }else{
                data[i] = { date : new Date(Object.keys(monthobject[i])).getTime(),
                    value : monthobject[i][Object.keys(monthobject[i])]};
            }

        }
    }else {// 주별


        let weekdate = []; // 주차별 데이터
        let datelist = [];
        let tempcount = 0;
        // 주차 구하기

        let year = 2022;
        let week = 0;
        for(let i = 0 ; i < Object.keys(jsondata).length; i++){ // 데이터 길이만큼 반복
            let date = Object.keys(jsondata)[i]; // i 인덱스 날짜
            if(year==new Date(date).getFullYear() && week == new Date(date).getWeek()){ // 존재한다면
                tempcount = 0;
                let datevnum = Object.keys(jsondata[date]).length;
                for(let j = 0 ; j < datevnum ; j++){ // 해당일 확진자 반복문
                    tempcount += jsondata[date][Object.keys(jsondata[date])[j]]["1"]["확진자"]; // g
                }
                for(let z = 0; z < weekdate.length ; z++){ // 키 찾기 반복문
                   if(Object.keys(weekdate[z]) == year +"-"+ week){ // 키가 같다면
                       weekdate[z][year +"-"+ week] = weekdate[z][year +"-"+ week] + tempcount;
                   }
                }
                // 값넣기
            }else{ // 존재하지않는다면
                tempcount = 0;
                let datevnum = Object.keys(jsondata[date]).length;
                for(let j = 0 ; j < datevnum ; j++){ // 해당일 확진자 반복문
                    tempcount += jsondata[date][Object.keys(jsondata[date])[j]]["1"]["확진자"]; //
                }
                datelist.push(Object.keys(jsondata)[i]);
                weekdate.push({ [new Date(date).getFullYear() +"-"+ new Date(date).getWeek()] : tempcount} ); // 배열추가
            }
            year = new Date(date).getFullYear();
            week = new Date(date).getWeek();
        }
       /* weekdate[i][Object.keys(weekdate[i])]*/
        // 데이터 집어넣기
        for(let i = 0 ; i < weekdate.length ; i ++){
            if(i == weekdate.length - 1){
                data[i] = {
                    date : new Date(datelist[i]).getTime(),
                    value : weekdate[i][Object.keys(weekdate[i])],
                    bullet : true
                };
            }else{
                data[i] = {
                    date : new Date(datelist[i]).getTime(),
                    value : weekdate[i][Object.keys(weekdate[i])],
                };
            }
        }





    }




    /*    for(let i = 0; i < Object.keys(jsondata).length; i++){ // jsondata만큼반복

            let dat1 = new Date(Object.keys(jsondata)[i]);

            console.log("* 3일 더하기 : " + dat1.getFullYear() + "-" + (dat1.getMonth() + 1) + "-"
                + (dat1.getDate() + 7) + "<br/>");
        }*/


    series.data.setAll(data);



// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

}

Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; // dowOffset이 숫자면 넣고 아니면 0
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            let nYear = new Date(this.getFullYear() + 1,0,1);
            let nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};



