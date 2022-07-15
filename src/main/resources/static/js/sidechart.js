
am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv3");


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

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15
});

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
}));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
    labelText:"{valueY}"
})
}));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function(fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});

    series.columns.template.adapters.add("stroke", function(stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});
    Object.keys(jsondata)[1]
    Object.keys(jsondata[Object.keys(jsondata)[1]])
// Set data
    var data = [];
    let krcnt = 0; //누적확진
    for(let i = 0; i < Object.keys(jsondata).length ; i++){
        let krindex = Object.keys(jsondata[Object.keys(jsondata)[i]]).indexOf("KR"); // 한국확진자 index 보관
        if(krindex != -1){// 한국확진자가 존재한다면
            krcnt += jsondata[Object.keys(jsondata)[i]].KR[1]["확진자"]; // 확진자 더하기
            data.push({country : Object.keys(jsondata)[i],
                       value : krcnt });
        }
    }
    xAxis.data.setAll(data);
    series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

}); // end am5.ready()

/////////////////////////////////////////////////////////////////////////////////////

am5.ready(function() {
let count = 0;
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv4");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX:true
        })
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.1,
            groupData: false,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        })
    );
    let chco = 0;
    function createAxisAndSeries(startValue, opposite) {
        var yRenderer = am5xy.AxisRendererY.new(root, {
            opposite: opposite
        });
        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 1,
                renderer: yRenderer
            })
        );


        if (chart.yAxes.indexOf(yAxis) > 0) {
            yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
        }

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value",
                    valueXField: "date",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "{valueY}"
                    }),
                })
            );
        //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
        series.strokes.template.setAll({ strokeWidth: 1 });

        yRenderer.grid.template.set("strokeOpacity", 0.05);
        yRenderer.labels.template.set("fill", series.get("fill"));
        yRenderer.setAll({
            stroke: series.get("fill"),
            strokeOpacity: 1,
            opacity: 1
        });

        // Set up data processor to parse string dates
        // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
        series.data.processor = am5.DataProcessor.new(root, {
            dateFormat: "yyyy-MM-dd",
            dateFields: ["date"]
        });

        // 상위 3개 나라 가져오기
            // 데이터 구해오기
        series.data.setAll(generateChartData(jsondate2[count].ISO));
    }

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

// add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    createAxisAndSeries(100, false);
    createAxisAndSeries(100, true);
    createAxisAndSeries(100, false);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

// Generates random data, quite different range
    function generateChartData(re) {
        var data = [];
        let cnt = 0;// 확진자 누적 변수

        // json 길이만큼 반복
        for(let i = 0; i < Object.keys(jsondata).length ; i++){
            let krindex = Object.keys(jsondata[Object.keys(jsondata)[i]]).indexOf(re); // 해당국가 index 보관
            if(krindex != -1){// 해당국가가 존재한다면
                cnt += jsondata[Object.keys(jsondata)[i]][re][1]["확진자"]; // 확진자 더하기
                data.push({date : new Date(Object.keys(jsondata)[i]).getTime(),
                    value : cnt });
            }
        }


        count++;
        return data;
    }
    //html 삽입
    let html = '<span style="color: #B3DBEE;">'+jsondate2[0]["국가명"]+'</span> | <span style="color: #E17ED5;">'+jsondate2[1]["국가명"]+'</span> | <span style="color:#8D76DF;">'+jsondate2[2]["국가명"]+'</span>';
    $("#colortext").html(html);
}); // end am5.ready()


