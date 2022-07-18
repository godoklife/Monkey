
var root;
let count = 10;
let jsondate2 = new Object();

/* 데이터 가져오기 */
function getGeoChartData(){
    $.ajax({
        url:'/statistics/getgeochartdata',
        method:'GET',
        async: false,
        success:function (jsonArray){
            jsondate2 = jsonArray.sort(function (a, b){
                return b["확진자"] - a["확진자"];
            })
        },
        error:function (err){
            alert("잠시후 다시 시도해주세요 : 코드 똑바로 짜시오.")
        }
    });
}

am5.ready(function() {
    getGeoChartData();//데이터호출

    getchar();
}); // end am5.ready()

function setchartnum(re){
    count = re;
    root.dispose(); // 기존 차트 삭제
    getchar();
}



function getchar(){

    root = am5.Root.new("chartdiv2");


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


// 데이터 넣기
    var data = [];
    if(count == -1){
        for(let i = 0; i < jsondate2.length ; i++){
            /*console.log(jsondate2[i]["확진자"]);*/
            data[i] = {"country" : jsondate2[i]["국가명"],
                "value" : jsondate2[i]["확진자"]};
        }
    }else{
        for(let i = 0; i < count ; i++){
            /*console.log(jsondate2[i]["확진자"]);*/
            data[i] = {"country" : jsondate2[i]["국가명"],
                "value" : jsondate2[i]["확진자"]};
        }
    }
    xAxis.data.setAll(data);
    series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
}



