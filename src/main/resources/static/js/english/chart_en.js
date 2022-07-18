let geochartArray;
let date;   // 날짜 배열
let country;    // 국가명(한글) 배열
let totalconfirmed; // 총 확진자, drawVisualization()에서 데이타 뽑아내는 김에 해당 변수 초기화 시킴.
let totalsuspected; // 총 유증상자
let page=1; // 현재 페이지
let totalpage; // 전체 페이지
let size = 10; // 한 페이지에 표시할 국가수
let startbtn=1;   // 페이징 버튼의 시작 번호
let endbtn=10;     // 페이징 버튼의 끝 번호
let keyword=[];
let sortingKey = "확진자"  // <-- value로 검색 후에도 정렬하기 위해 전역변수화, 페이지 실행 초기값 : 확진자 많은순 정렬


loadData(); // <--- 동기식 으로 설정되어있음

getGeoChartData();  // <--- ajax 로드 완료 후, runFunctions() 실행.
function runFunctions(){
// 구글지오차트 로드, 밖에 꺼내놓으니 비동기로딩때문에 먼저 로딩될때도 있고 지멋대로임;;
    runGoogleChart();
    showTable(page);    // <-- 지오차트 바로 하단 테이블 출력
    getTable();
      // <-- 브라우저 크기 변경시 구글맵 다시 로드(리사이징 위해서)
    showHeader();

}

function runGoogleChart(){
    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(drawVisualization);
}

function showHeader(){

    let confirmed=0;
    let suspected=0;
    let country=0;
    let korean=0;

    for(let i=0; i<geochartArray.length-1; i++) {
        if(geochartArray[i]['국가명']!=='United States'){
            if(geochartArray[i]['확진자']!==0) {
                confirmed += geochartArray[i]['확진자'];
            }
            if (geochartArray[i]['유증상자']!==0){
                suspected += geochartArray[i]['유증상자'];
            }
        }else{  // 한국인 확진자 집계
            if(geochartArray[i]['확진자']!==0){
                korean += geochartArray[i]['확진자'];
            }
        }
    }
    confirmed+=korean;

    let htmlConfirmed= confirmed+" person";
    let htmlSuspected= suspected+" person";
    let htmlCountry= (geochartArray.length-1) +" country";
    let htmlKorean= korean+" person";

    $('#top_board_confirmed').html(htmlConfirmed);
    $('#top_board_suspected').html(htmlSuspected);
    $('#top_board_country').html(htmlCountry);
    $('#top_board_korean').html(htmlKorean);

}


// 페이지 로드시 차트 실행에 필요한 json 파일처리& 메모리 적재
function loadData(){
    $.ajax({
        url:'/statistics/loaddata',
        data : {"language" : "en"},
        method:'get',
        async:false,
        success:function (args) {
            if(args===false){
                alert('Error loading data');
            }
        }
    });
}

// function getTable(){
//     $.ajax({
//         url:'/statistics/viewgeo',
//         data:{},
//         method:'GET',
//         success:function (jsonObject){
//             console.log(jsonObject);
//             let entity='';
//             for(let i=0; i<jsonObject['발병국가수'];i++){
//                 let countryName = jsonObject['발병국명단'][0][i];
//                 if(countryName.includes(' ')){
//                     countryName = jsonObject['발병국명단'][0][i].replace(' ', '&nbsp;');
//                 }
//                 entity+='<div>' +
//                     '<input type="checkbox" id="chk'+jsonObject["발병국명단"][0][i]+'" ' +
//                     'onclick=chkcheckbox("'+jsonObject["발병국명단"][0][i]+'")>' +
//                     '<span> '+jsonObject["발병국명단"][0][i]+' </span>' +
//                     '</div>';
//             }
//             $("#entity-container").html(entity);
//         },
//         error:function (err){
//             console.log(err);
//             alert("잠시후 다시 시도해주세요 : 코드 똑바로 짜시오.")
//         }
//     });
// }

function getTable(){

    let entity='';
    for(let i=0; i<geochartArray.length-1;i++){
        let countryName = geochartArray[i]['국가명'];
        if(countryName.includes(' ')){
            countryName = geochartArray[i]['국가명'].replace(' ', '&nbsp;');
        }
        entity+='<div>' +
            '<input type="checkbox" id="chk'+countryName+'" ' +
            'onclick=chkcheckbox("'+countryName+'")>' +
            '<label for="chk'+countryName+'"> '+countryName+' </label>' +
            '</div>';
    }
    $("#entity-container").html(entity);

}

function chkcheckbox(value){    // 체크박스에 체크된 / 언체크된 국가를 배열에 담거나 제거
    let tmp = document.getElementById('chk'+value);
    if ($(tmp).is(':checked')){
        keyword.push(value);
    }else{
        for(let i=0; i<keyword.length; i++){
            if(value===keyword[i]){
                keyword.splice(i,1);
                break;  // 중복값은 존재할 수 없기 때문에 검사 종료
            }
        }
    }
    page=1;
    if (keyword.length===0){
        totalpage = Math.ceil((geochartArray.length/size));
    }else{
        totalpage = Math.ceil((keyword.length/size));
    }

    showTable(page);
}

// 정렬

function showTable(index){  // 페이징처리
    // 페이지 기본값 : 확진자 많은 순으로 정렬
    geochartArray.sort(function (a, b){
        return b[sortingKey] - a[sortingKey];
    });
    page = index;
    startbtn = Math.ceil(page/10);
    if(startbtn>1){
        startbtn = 1+(Math.ceil(page/10)-1)*10;
    }
    endbtn = startbtn+10-1;
    if(endbtn>totalpage) endbtn = totalpage;
    if(endbtn===0) endbtn = 1;

    let tablecode = '<tr>\n' +
        '                        <th> </th>\n' +
        '                        <th>Country</th>\n' +
        '                        <th>Confirmed</th>\n' +
        '                        <th>Symptoms</th>\n' +
        '                        <th>Percentage(%)</th>\n' +
        '                    </tr>';
    if(keyword===undefined || keyword.length===0){
        for(let i=0; i<geochartArray.length-1; i++){    // 가장 마지막 인덱스에는 총확진자밖에 안들어있음.
            if( i>=((index-1)*size) && i<(index*size) ){
                tablecode+='<tr>\n' +
                    '                        <td>'+(i+1)+'</td>\n' +
                    '                        <td>'+geochartArray[i]['국가명']+'</td>\n' +
                    '                        <td>'+geochartArray[i]['확진자']+'</td>\n' +
                    '                        <td>'+geochartArray[i]['유증상자']+'</td>\n' +
                    '                        <td>'+( Math.round( geochartArray[i]['확진자']/geochartArray[geochartArray.length-1]['확진자총합'] *10000)/100)+'%</td>\n' +
                    '                    </tr>';
            }
            if(i==(index*size)){
                break;
            }
        }
    }else{
        // 사용자가 지정한 기준값( keyword = 국가명이 담긴 배열의 형태 )에 따라 국가를 테이블에 출력
        let tmpindex=1;
        for(let i=0; i<geochartArray.length-1; i++){

            if (keyword.includes(geochartArray[i]['국가명'])) {
                if( tmpindex>((index-1)*size) && tmpindex<=(index*size) ) {
                tablecode += '<tr>\n' +
                    '                        <td>' + tmpindex + '</td>\n' +
                    '                        <td>' + geochartArray[i]['국가명'] + '</td>\n' +
                    '                        <td>' + geochartArray[i]['확진자'] + '</td>\n' +
                    '                        <td>' + geochartArray[i]['유증상자'] + '</td>\n' +
                    '                        <td>'+( Math.round( geochartArray[i]['확진자']/geochartArray[geochartArray.length-1]['확진자총합'] *10000)/100)+'%</td>\n' +
                    '                    </tr>';

                }
                tmpindex++;
            }

        }

    }
    //////////////////////////// 페이징 버튼 생성 코드 ////////////////////////////////////
    let pagehtml = "";

    ////////////////////////// 이전 버튼 /////////////////////////////////////////////
    if(page==1){    // 현재 페이지가 첫페이지이면
        pagehtml += '<li class="page-item disabled"><button class="page-link" type="button" onclick="showTable('+(page-1)+')">Previous</button> </li>';
    }else{  // 현재페이지가 첫페이지가 아니면
        pagehtml += '<li class="page-item"><button class="page-link" type="button" onclick="showTable('+(page-1)+')">Previous</button> </li>';
    }
    ////////////////////////////////////////////////////////////////////////////////
    for(let i = startbtn; i <= endbtn; i++) {
        if(i==page){
            pagehtml += '<li class="page-item active"><button class="page-link" type="button" onclick="showTable('+i+')">'+i+'</button> </li>';
        }else{
            pagehtml += '<li class="page-item"><button class="page-link" type="button" onclick="showTable('+i+')">'+i+'</button> </li>';
        }

    }
    ////////////////////////// 다음 버튼 ///////////////////////////////////////////////////
    if(page==totalpage || totalpage == 0){
        pagehtml += '<li class="page-item disabled"><button class="page-link" type="button" onclick="showTable('+(page)+')">Next</button> </li>';
    }else{
        pagehtml += '<li class="page-item"><button class="page-link" type="button" onclick="showTable('+(page+1)+')">Next</button> </li>';
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    $("#pagebtnbox").html(pagehtml);

    $('#totaltable').html(tablecode);
}


function getGeoChartData(){
    $.ajax({
        url:'/statistics/getgeochartdata',
        method:'GET',
        success:function (jsonArray){
            geochartArray = jsonArray;
            totalpage = Math.ceil((geochartArray.length/size));
            runFunctions();
        },
        error:function (err){
            alert("Please try again later")
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

    for(let i=0; i<geochartArray.length; i++){
        data.addRows([[{v:geochartArray[i]['ISO'],f:geochartArray[i]['국가명']},
            geochartArray[i]['확진자'],'Confirmed : '+geochartArray[i]['확진자']+'\n' +
            'Symptoms : '+geochartArray[i]['유증상자']+'']]);
        ivalue[geochartArray[i]['ISO']] = 'http://www.google.com';
        if(i===geochartArray.length-1){
            totalconfirmed = geochartArray[i]['확진자총합'];
            let code='<span>number of confirmed cases worldwide : '+totalconfirmed+'</span>';
            $('#totalconfirmed_div').html(code);
        }
    }


    var options = {
        colorAxis: {
            colors:['#ffe1e1','#750000']
        },
        defaultColor:'#c0ffab'

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



/*//전체 JSOND 확인 함수
function getalldata(){
    $.ajax({
        url: "/statistics/getalldata",
        success : function (re){
            console.log("전체데이터");
            console.log(re);
        }
    })
}*/


// 리턴받는 형식 :
// [ { 2022-05-18 : { KR : [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] ,
//                  { JP : [ { 국가명 : 일본 }, { 확진자 : 30 }, { 유증상자 : 100 } ] } } ,
//
//   { 2022-05-19 : { KR : [ { 국가명 : 대한민국 }, { 확진자 : 10 }, { 유증상자 : 200 } ] ,
//                  { JP : [ { 국가명 : 일본 }, { 확진자 : 30 }, { 유증상자 : 100 } ] },
//                  { CN : [ { 국가명 : 중국 }, { 확진자 : 30 }, { 유증상자 : 100 } ] } }
// ]

// 개고생해서 만들었는데 생각해보니 아직 써먹을곳이 없음. 지우지말고 일단 냅두기
/* function getdataDate(){
     $.ajax({
         url:'/statistics/getdatadate',
         success:function (jsonarray){
             geochartArray = jsonarray;


            /!* let dataKeys = Object.keys(geochartArray['data']);
             for(let i=0; i< dataKeys.length; i++){
                 let datakey = dataKeys[i]
                    /!* console.log(datakey+' : '+geochartArray['data'][datakey])*!/
                 let countrykeys = Object.keys(geochartArray['data'][datakey]);
                 for (let j=0; j<countrykeys.length; j++){
                     let countrykey = countrykeys[j];
                     /!*console.log(countrykey+' : '+geochartArray['data'][datakey][countrykey]);*!/
                 }
             }
            console.log(dataKeys);*!/

         }
     });
 }*/


 //선그래프

