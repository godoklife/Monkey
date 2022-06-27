readJson();


function readJson(){
    $.ajax({
        url:'/readjsonfile',
        data:{},
        method:'request',
        success:function (args){
            console.log(args);
            alert("수신완료");
        }
    })
}