startview();    // 모바일에서 접속했을 경우 class 제거 / 추가 하는 메서드

// 모바일에서 접속할 경우 클래스(css) 변경
function startview() {
    if($(window).width() < 768){
        document.getElementById('top_div').classList.remove('col-sm-8');
        document.getElementById('top_div').classList.remove('offset-2');
        $('.top_title_slash').css('border-right','0px');
            // 모바일에서 전세계 확진자, 전세계 유증상자~~~ 우측 바 안보이도록 0px값 덮어씌움

    }
}


function show_trollbox(){   // 트롤박스 펴고 접는 팡션
    if($("#trollbox")[0].clientHeight===0){
        $("#trollbox").animate({width:"480px",height:"640px"},200);
        $("#trollbox").css('padding-top','20px');
        $("#trollbox").css('padding-bottom','60px');

    }else{
        $("#trollbox").animate({width:"0",height:"0"},200);$("#trollbox").css('padding-top','20px');
        $("#trollbox").css('padding-bottom','0');
        $("#trollbox").css('padding-top','0');
    }
}

$(document).ready(function (){

    // 1. 익명 닉네임(난수) 생성
    // 1~ 1000 사이의 난수 생성
    let rand = Math.floor(Math.random()*1001);
    let username = '익명'+rand;

    // 2-1. 전송 버튼을 눌렀을 때
    $('#btnMsgSend').click(e=>{
        send();
    });
    // 2-2 내용입력후 엔터 눌렀을 떄
    $('#msg').on('keyup',function (e){
        if(e.keyCode===13){ // 엔터 입력시
            send();
        }
    });



    // 2. JS에서 제동하는 websocket 클래스 사용하기
        // 1) [/ws/chat] 해당 URL로 소켓 연결
    let websocket = new WebSocket('wss://monkeypoxlive.kr/ws/chat');
    // todo: 테스트용 로컬 주소
    // let websocket = new WebSocket('wss://localhost/ws/chat');

    websocket.onmessage = onMessage;
    websocket.onopen = onOpen;
    websocket.onclose = onClose;

    // 3. 소켓 연결이 종료되었을 때
    function onClose(){
        websocket.send(username+':님이 퇴장했습니다..');
    }
    // 4. 소켓 연결이 열렸을 때
    function onOpen(){
        websocket.send(username+':님이 입장했습니다.');
    }
    // 5. 메시지 전송
    function send(){
        let msg = $('#msg').val();

        if(msg==='' || msg==='\n')return;   // 내용이 없는 경우 실행치않음

        websocket.send(username+':'+msg);
        $('#msg').val('');
        $('#msg').focus();
    }
    // 6. 메시지 수신
    function onMessage(msg){
        let data = msg.data;    // 실제 표시해야 할 메시지 내용이 담긴 데이타
        let sender = data.split(':')[0];    // 보낸 사람
        let message = data.split(':')[1];   // 메시지 내용

        let html='';
        if(sender===username){  // 내가 보낸 메시지라면
            html+='<div id="my_msg" class="alert alert-success ms-auto">' +
                '          <span> '+sender+' : '+message+' </span>' +
                '           <br>' +
                '        </div>';

        }else{  // 다른사람이 보낸 메시지라면
            html+='<div id="your_msg" class="alert alert-secondary me-auto">' +
                '          <span> '+sender+' : '+message+' </span>' +
                '           <br>' +
                '        </div>';
        }
        $('#msgdiv').append(html);   // 누적하기

        // 스크롤 최하단으로 이동시키기
        $('#msgdiv').scrollTop($('#msgdiv')[0].scrollHeight);

        // $('#contentbox')[0].scrollHeight : 해당 div 스크롤의 전체 길이
        // $('#contentbox').scrollTop(); : 스크롤 막대의 상단 위치

    }
});

