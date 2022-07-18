
function show_trollbox(){   // 트롤박스 펴고 접는 팡션
    if($("#trollbox")[0].clientHeight===0){
        $("#trollbox").animate({width:"15.2vw",height:"50vh"},200);
    }else{
        $("#trollbox").animate({width:"0",height:"0"},200);
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
    let websocket = new WebSocket('ws://localhost:80/ws/chat');

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
        websocket.send(username+':'+msg);
        $('#msg').val('');
    }
    // 6. 메시지 수신
    function onMessage(msg){
        let data = msg.data;    // 실제 표시해야 할 메시지 내용이 담긴 데이타
        let sender = data.split(':')[0];    // 보낸 사람
        let message = data.split(':')[1];   // 메시지 내용

        let html='';
        if(sender===username){  // 내가 보낸 메시지라면
            html+='<div class="alert alert-success">' +
                '          <span> '+sender+' : '+message+' </span>' +
                '           <br>' +
                '        </div>';

        }else{  // 다른사람이 보낸 메시지라면
            html+='<div class="alert alert-secondary">' +
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
