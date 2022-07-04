readJson();


function readJson(){
    $.ajax({
        url:'/statistics/readjsonfile',
        data:{},
        method:'GET',
        success:function (args){
            console.log(args);
            alert("수신완료");
        }
    })
}