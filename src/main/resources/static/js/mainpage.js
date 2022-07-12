
function chageLangSelect(){


    // select element에서 선택된 option의 value가 저장된다.
    var selectValue = $("#languageselectbox").val();
    $.ajax({
        url : "/statistics/selectlanguage",
        success : function(re){

        }
    })
    if(selectValue == "ko"){
        location.href = "/";
    }else{
        location.href = "/"+selectValue;
    }
}
