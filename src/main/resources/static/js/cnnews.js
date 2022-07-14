getcnnews();

let html="";
function getcnnews() {
    $.ajax({
        url: '/getcnnews',
        success : function(news){
            for(let i=0 ; i< news.length ; i++){
                html +=
                    '<tr class="newsbox">'+
                    '<td><div class="row"><div width="100%"><a href="' +news[i].link+ '">'+ news[i].title +'</a><br><span class="txt">' +news[i].txt+ '</span></div>'+
                      '</div></td>'+
                    '</tr>';
            }
            $("#newstable").html(html);
        }
    });
}
