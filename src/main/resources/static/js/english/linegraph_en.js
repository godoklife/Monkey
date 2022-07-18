

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
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
    }));

    chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
    }));
    series.strokes.template.setAll({
        strokeWidth: 2,
        strokeDasharray: [3, 3]
    });

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
    series.bullets.push(function(root, series, dataItem) {
        if (dataItem.dataContext.bullet) {
            var container = am5.Container.new(root, {});
            var circle0 = container.children.push(am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xff0000)
            }));
            var circle1 = container.children.push(am5.Circle.new(root, {
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

            return am5.Bullet.new(root, {
                sprite: container
            })
        }
    })

// Set data
    var data  = [];
    for(let i = 0; i < Object.keys(jsondata).length; i++){ // jsondata만큼반복
        // 날짜 분리
        let datea = Object.keys(jsondata)[i]; // key 날짜
        /*console.log(jsondata.data[date]);*/
        let datevnum = Object.keys(jsondata[datea]).length;
        /*Object.keys(jsondata.data[date])[0]*/
        // 총 확진자수 구하기
        let datevalu = 0;
        for(let j = 0 ; j < datevnum; j++){
           datevalu += jsondata[datea][Object.keys(jsondata[datea])[j]]["1"]["확진자"];
        }
        if(i == Object.keys(jsondata).length - 1){
            data[i] = { date : new Date(datea).getTime()
                , value : datevalu
                ,bullet: true};
        }else{
            data[i] = { date : new Date(datea).getTime()
                , value : datevalu};
        }
    }
    series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

}); // end am5.ready()
