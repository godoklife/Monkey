getnews();

let html="";
function getnews() {
    $.ajax({
        url: '/getnews',
        success : function(news){
            console.log(news);
            for(let i=0 ; i< news.length ; i++){
                html +=
                    '<tr class="newsbox">'+
                    '<div style="height: 30%;"><td class="newsnum" style="width: 10%;">'+(i+1)+'번</td></div> <td><a href="' +news[i].link+ '">'+ news[i].title +'</a><br><span class="txt">' +news[i].txt+ '</span></td><br>'+
                    '</tr>';
            }
            $("#newstable").html(html);
        }
    });
}

