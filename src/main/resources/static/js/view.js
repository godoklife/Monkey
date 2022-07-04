// 구글 지오챠트 불러오기

function getdataDate(){
    $.ajax({
        url:'/getdataDate',
        success:function (jsonarray){
            console.log(jsonarray);
            alert('getdataDate 수신 성공');
        }
    })
}




function getTable(){
    $.ajax({
        url:'/viewgeo',
        data:{},
        method:'GET',
        success:function (jsonObject){
            console.log(jsonObject);
            getdataDate();
            alert("통신성공");
            let entity='';
            google.load('visualization', '1', {'packages': ['geochart']});
            google.setOnLoadCallback(drawVisualization);

            for(let i=0; i<jsonObject['발병국가수'];i++){
                entity+='<div>' +
                    '<input type="checkbox" value="'+jsonObject["발병국명단"][0][i]+'">' +
                    '<span> '+jsonObject["발병국명단"][0][i]+' </span>' +
                    '</div>';
            }
            $("#entity-container").html(entity);
        },
        error:function (err){
            console.log(err);
            alert("잠시후 다시 시도해주세요 : 코드 똑바로 짜시오.")
        }
    });
}

// Google GeoChart 정의
function drawVisualization() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Value');
    data.addColumn({type:'string', role:'tooltip'});
    var ivalue = new Array();

    // v : 표시할 지역 설정, f : 표시할 명칭, 100 : 확진자 수 위치, 툴팁 위치
    // ivalue[v값] = url -> 클릭시 해당 url로 이동.
    data.addRows([[{v:'US',f:'미국'},100,'확진자 : 100\n유증상자 : 20']]);
    ivalue['US'] = 'http://www.google.com';

    data.addRows([[{v:'CN',f:'중국'},200,'확진자 : 200']]);
    ivalue['CN'] = '';



    var options = {
        colorAxis: {
            colors:['#ff8e8e','#750000']
        }

    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    // 이벤트 리스너, 클릭시 해당 지역의 ivalue 내의 링크 타고 들어가는 메소드.
    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        if (selection.length == 1) {
            var selectedRow = selection[0].row;
            var selectedRegion = data.getValue(selectedRow, 0);
            if(ivalue[selectedRegion] != '') { window.open(ivalue[selectedRegion]);  }
        }
    });
    chart.draw(data, options);
}

