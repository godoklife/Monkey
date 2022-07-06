getnews();

let html="";
function getnews() {
    $.ajax({
        url: '/getnews',
        success : function(news){
            for(let i=0 ; i< news.length ; i++){
                html +=
                    '<tr class="newsbox">'+
                    '<div style="height: 30%;"></div> <td><a href="' +news[i].link+ '">'+ news[i].title +'</a><br><span class="txt">' +news[i].txt+ '</span></td><br>'+
                    '</tr>';
            }
            $("#newstable").html(html);
        }
    });
}

