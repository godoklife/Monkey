function stealingjson(){
    fetch('/stealingjson')
        .then((response)=>{
            console.log(response)   // @삭제
            if (response.ok){
                alert("json저장 성공 : 다음 페이지로 넘어갑니다.")
                window.location.href="/jsontable"
            }else{
                alert("json저장 실패 : console.log() 확인")
                console.log(response);
            }
        })
        .catch(()=>{
            alert("예외 발생 : 코드 똑바로 만드시오.");
        });
}
// 서버 켠 후 한번만 눌러줄것, 챠트에 필요한 데이타들 메모리에 올리는 작업 실행
// todo: 지금은 수동으로 하지만 나중에는 json파일 업데이트 될 때 마다 또는 서버 켜지면 자동으로 실행되도록 자동화 해야함.
function loadData(){
    $.ajax({
        url:'/statistics/loaddata',
        method:'get',
        success:function (args) {
            if(args===true){
                alert('정상적으로 메모리에 적재가 완료되었읍니다.');
            }else {
                alert('예외발생. 콘솔 읽어보셈');
            }
        }
    });
}