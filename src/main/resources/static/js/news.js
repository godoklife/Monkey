getnews();

let html="";
function getnews() {
    $.ajax({
        url: '/getnews',
        success : function(news){
            for(let i=0 ; i< news.length ; i++){
                html +=
                    '<tr class="newsbox">'+
                    '<td><div class="row"><div class="col-md-10"><a href="' +news[i].link+ '">'+ news[i].title +'</a><br><span class="txt">' +news[i].txt+ '</span></div>'+
                      '<div class="col-md-2"><img class="img" style="width: 100%;" src='+news[i].img+'></div></div></td>'+
                    '</tr>';
            }
            $("#newstable").html(html);
        }
    });
}

/*function getyoutube(){ 대기
    $.ajax({
        url:"/getyoutubeurl",
        success: function (re){
            console.log(re);
        }
    })
}*/

