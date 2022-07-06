let continent = new Object();
gettravel(); // 처음시작 함수 호출

//JSON 가져오기 함수
function gettravel(){
    $.ajax({
        url:"/travel/gettravel",
        method:"GET",
        async:false,
        success : function (re){
            console.log(re);
            division(re);
        }
    });
}

//분류 함수
function division(re){
    for(let j = 0; j < 3; j++){
            continent = {};
            for(let i = 0; i < re.data.length; i++){
                if(re.data[i].alarm_lvl == j + 2){ // 경보단계 순차
                    let pass = isKeyExists(continent,re.data[i].continent_nm);
                    if(pass){ // 만약 key가 존재하면
                        continent[re.data[i].continent_nm].push(re.data[i].country_nm);
                    }else{// 만약 key가 존재하지않으면
                        continent[re.data[i].continent_nm] = [re.data[i].country_nm];
                    }
                }
            }
        inserthtml(j);
        console.log(continent);
    }
}

//객체안 key 확인 함수
function isKeyExists(obj,key){
    if( obj[key] == undefined ){
        return false;
    }else{
        return true;
    }
}


//가로크기 변환되었을때 실행함수
$(window).resize(function() {
    if($(window).width() < 767) {
        $(".title").addClass("rounded");
        $(".title").css({"border-top": "1px solid #c8c8c8"});
    }else{
        $(".title").removeClass("rounded");
        $(".title").css({"border-top": ""});
    }
});
// html
function inserthtml(lv){
    let html = "";

    // 목차 html 생성
    let continentarr = Object.keys(continent).sort(); // 키값 배열

    for(let i = 0 ; i < continentarr.length; i++){// 키의 길이 만큼 반복
        html += '<li id="'+continentarr[i]+'"><span style="font-weight: bold" class="spandiv">'+continentarr[i]+'</span><br></li>';

    }
    if(lv == 0){ // 레벨 2 라면
        $("#reserve").html(html);
    }else if(lv == 1){// 레벨 3 이면
        $("#suasion").html(html);
    }else { // 레벨 4이면
        $("#prohibition").html(html);
    }
    // 나라

    for(let i = 0 ; i < continentarr.length; i++) {// 키의 길이 만큼 반복
        let html2 = "";
        for (let j = 0; j < continent[continentarr[i]].length; j++) { // 대륙나라별만큼 반복
            html2 += ''+continent[continentarr[i]][j]+', ';
        }
        if(lv == 0){// 레벨 2 라면
            $("#"+continentarr[i]+"").append(html2);
        }else if(lv == 1){// 레벨 3 라면
            $("#"+continentarr[i]+"").append(html2);
        }else {// 레벨 4 라면
            $("#"+continentarr[i]+"").append(html2);
        }
    }
}

// 네비게이션 이동
function pagemove( idkey ){
    console.log(idkey);
    let offset = $('#'+idkey+'').offset();
    $("html, body").animate({scrollTop: offset.top - 40},400);
}
//스크롤 이베트
$(document).ready(function() {

    // 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.
    var floatPosition = parseInt($("#floatMenu").css('top'));
    // 250px 이런식으로 가져오므로 여기서 숫자만 가져온다. parseInt( 값 );

    $(window).scroll(function() {
        // 현재 스크롤 위치를 가져온다.
        var scrollTop = $(window).scrollTop();
        var newPosition = scrollTop + floatPosition + "px";

        /* 애니메이션 없이 바로 따라감
         $("#floatMenu").css('top', newPosition);
         */

        $("#floatMenu").stop().animate({
            "top" : newPosition
        }, 250);

    }).scroll();

});



