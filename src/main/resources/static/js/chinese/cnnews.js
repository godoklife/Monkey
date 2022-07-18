getcnnews();

let html="";
function getcnnews() {
    $.ajax({
        url: '/getcnnews',
        success : function(news){
            for(let i=0 ; i< news.length ; i++){
                html +=
                    '<tr class="newsbox">'+
                    '<td><div class="row"><div width="100%"><a href="' +news[i].link+ '">'+ news[i].title +'</a><br><span class="txt">' +news[i].txt+ '</span></div>'+
                      '</div></td>'+
                    '</tr>';
            }
            $("#newstable").html(html);
        }
    });
}

// 사이드바

// 모바일정도의 크기라면
function startview() {
    if($(window).width() < 768){
        $("#floatMenu").css({"display" : "none"}); // 네비게이션 삭제
    }else{
        $("#floatMenu").css({"display" : ""}); // 네비게이션 생성
    }
}



//가로크기 변환되었을때 실행함수
$(window).resize(function() {
    if($(window).width() < 768) {
        $(".title").addClass("rounded");
        $(".title").css({"border-top": "1px solid #c8c8c8"});
        startview(); // 가로크기의 따른 네비 유무 함수
    }else{
        $(".title").removeClass("rounded");
        $(".title").css({"border-top": ""});
        startview(); // 가로크기의 따른 네비 유무 함수
    }
});

//모바일 버전 네비게이션 이동


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