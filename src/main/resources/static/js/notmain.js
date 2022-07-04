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

function ihatework(){   // *.json 파일 제작용 메소드, URL 따라가면서 전부다 @삭제
    $.ajax({
        url:'/ihatework',
        method:'get',
        success:function (json) {
            console.log(json)
            alert('console.log를 확인하세요')
        }
    });
}