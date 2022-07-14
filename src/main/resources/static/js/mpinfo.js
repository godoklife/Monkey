

info();

function info(){
    let html = '<h2 class="content_title">원숭이두창이란?</h2>'+
               '<h3 class="content_subtitle">원숭이두창(Monkeypox)은 원숭이두창바이러스(Monkeypox virus)에 감염되어 발생하는 희귀질환으로, poxviridae과의 Orthopoxvirus속에 속합니다.</h3>'+
               '<p class="content_text">원숭이두창은 1958년 연구를 위해 사육된 원숭이들에서 수두와 비슷한 질병이 발생하였을 때 처음 발견되어 "원숭이두창" 이라는 이름이 붙여졌습니다. 원숭이두창에 감염된 사례는 두창 퇴치에 노력을 기울이던 1970년 콩고민주공화국에서 처음 보고되었으며, 이후 가봉, 나이지리아, 중앙아프리카공화국, 코트디브아르, 콩고공화국, 카메룬 등 중·서부 아프리카 국가에서 보고되며 풍토병화 되었습니다.</p><br>'+
               '<p class="content_text">그러나, 2022년 5월 이후 스페인, 영국, 이탈리아 등 유럽을 중심으로 발생하기 시작하여 미국 등 풍토병이 아닌 국가에서 이례적으로 발생함에 따라 국내 유입가능성도 점차 증가하여 우리나라는 2022년 6월 원숭이두창을 2급감염병으로 지정하고 감시를 강화하고 있습니다.</p><br>'+
               '<div class="content_divbox">'+
                    '<p class="content_text">※ 원숭이두창 풍토병 국가: 베냉, 카메룬, 중앙아프리카공화국, 콩고민중공화국, 가봉, 가나, 코트디브아르, 라이베리아, 나이지리아, 콩고, 시에라리온</p>'+
               '</div><br>'+
               '<h3 class="content_subtitle">원숭이두창은 인수공통감염병으로 원숭이두창 바이러스에 감염된 동물(쥐, 다람쥐, 프레리도그와 같은 설치류 및 원숭이 등), 감염된 사람 또는 바이러스에 오염된 물질과 접촉할 경우 감염될 수 있으며, 태반을 통해 감염된 모체에서 태아로 수직감염이 발생할 수 있습니다.</h3>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">(비말) 코, 쿠강, 인두, 점막, 폐포에 있는 감염비말에 의한 사람간 직접 전파</li>'+
                   '<li class="content_li">(피부병변 부산물) 감염된 동물·사람의 혈액, 체액, 피부, 점막병변과의 직간접 접촉</li>'+
                   '<li class="content_li">(매개물) 감염환자의 체액, 병변이 묻은 매개체(린넨, 의복 등) 접촉을 통한 전파</li>'+
                   '<li class="content_li">(공기) 바이러스가 포함된 미세 에어로졸을 통한 공기전파가 가능하나 흔하지 않음</li>'+
               '</ul>';
    $("#contentbox").html(html);
}

function main_symptoms(){
    let html =  '<h2 class="content_title">임상증상 및 검사방법</h2>'+
    '                <h3 class="content_subtitle">임상증상</h3>'+
    '                <p class="content_text">원숭이두창에 감염된 경우 질병의 정도는 경증에서 중등도이나 치명적일 수 있습니다.</p>'+
    '                <p class="content_text">감염이되면 1~2주간의 잠복기를 지나 ‘38℃ 이상의 급성 발열, 두통, 근육통 및 피로감 등’으로 시작되어 1~3일 후 <span class="boldtext">얼굴을 중심으로 발진증상</span>이 나타나며, <span class="boldtext">원심형으로 신체 다른 부위(특히 사지)로 확산</span>합니다. 림프절 부종이 주요 증상으로 나타나며, 증상은 보통 2~4주간 지속됩니다.</p>'+
    '                <ul class="content_ul">'+
    '                    <li class="content_li">잠복기: 5~21일(평균 7~14일)</li>'+
    '                    <li class="content_li">임상증상: 발열, 두통, 근육통, 요통, 림프절 부종, 오한, 피로, 발진(발열 후 약 1~3일이내)<br><span class="content_text">※ 발진은 반점(Macules), 구진(Papules), 수포(Vesicles), 농포(Pustules), 가피(Scabs)의 단계로 진행됨</span></span></li>'+
    '                    <li class="content_li">치명률: 일반적으로 약 1~10%로 알려져 있으며, WHO에 따르면 최근 치명률은 3~6%로 보고되고 있음</li>'+
    '                </ul>'+
    '                <p class="table_title">[원숭이두창과 다른 피부질환과의 차이점]</p>'+
    '                <table class="table content_table">'+
    '                    <tr>'+
    '                        <th width="10%;"></th>'+
    '                        <th width="18%;">원숭이두창<br>(Monkeypox)</th>'+
    '                        <th width="18%;">수두<br>(Varicella)</th>'+
    '                        <th width="18%;">대상포진<br>(Herpes zoster)</th>'+
    '                        <th width="18%;">단순포진<br>(Herpes simplex)</th>'+
    '                        <th width="18%;">홍역<br>(Measles)</th>'+
    '                    </tr>'+
    '                    <tr id="table_img">'+
    '                        <td class="align-middle">발진 사진</td>'+
    '                        <td class="align-middle" colspan="5"><span class="imgbtn" onclick="img()">혐오스러운 사진이 포함되어 있습니다. [사진 확인]</span> </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">발진 특징</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>머리부터 시작해서 전신 팔다리 쪽으로 진행</li>'+
    '                                <li>경계가 명확하고 중앙이 파인 수포성발진</li>'+
    '                                <li>대부분 같은 단계의 발진</li>'+
    '                                <li>손/발바닥 침범</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>머리를 포함하여 주로 몸통쪽으로 진행</li>'+
    '                                <li>경계가 불명확한 수포성 발진</li>'+
    '                                <li>발진마다 단계가 다를 수 있음</li>'+
    '                                <li>손/발바닥 침범 드묾</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>몸 전체에 나타날 수 있으며, 신경절을 따라 띠 형태로 나타남</li>'+
    '                                <li>국소적인 부위에 나타나는 수포성 병변</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>국소적으로 피부, 점막 (눈, 입술 등)모두 침범 가능</li>'+
    '                                <li>주로 입술, 구강, 인두, 음부 쪽 발생</li>'+
    '                                <li>수포, 궤양 동반 가능</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>붉은 반구진성 발진</li>'+
    '                                <li>얼굴~귀뒤, 이후 몸통 중앙쪽으로 진행</li>'+
    '                                <li>탈피 가능</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">임상양상</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>발열+두통+근육통부터 시작</li>'+
    '                                <li>고열 가능</li>'+
    '                                <li>발열 1~4일 후 발진 발생</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>두통+근육통부터 시작</li>'+
    '                                <li>보통은 미열 (38.8도 미만)</li>'+
    '                                <li>발열 0~2일 후 발진 발생</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>통증이 먼저 나타날 수 있음(감각신경 침범)</li>'+
    '                                <li>운동신경 침범의 경우 마비 동반 가능</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>병변 부위 통증, 가려움증 유발</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>발열+기침+결막염</li>'+
    '                                <li>전구증상 후 발진 발생</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">림프절 비대</td>'+
    '                        <td class="align-middle"><ul><li>주로 목, 겨드랑이, 서혜부</li><li>단단한 압통</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>드묾</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>드묾</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>드묾</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>드묾</li></ul></td>'+
    '                    </tr>'+
    '                </table>'+
    '                <h3 class="content_subtitle">검사방법</h3>'+
    '                <p class="content_text">원숭이두창 확인진단을 위해서는 의심환자의 혈액, 피부 병변의 조직 및 병변의 액, 가피 등을 통한 유전자검출검사가 필요합니다.</p>';
    $("#contentbox").html(html);
}

function cure(){
    let html =  '<h2 class="content_title">치료법</h2>'+
                '<h3 class="content_subtitle">상용화된 특이치료제는 없으며, 감염된 사람은 격리입원하여 증상에 따른 대증치료를 받게 됩니다. 국내에 원숭이두창 치료에 사용할 수 있는 항바이러스제와 면역글로불린이 확보되어 있으며, 동 약제에 대한 사용안내서를 제작하였습니다. 또한 원숭이두창 치료를 위한 항바이러스제인 테코리비리바트를 도입 예정중에 있습니다.</h3>'+
                '<p class="content_text">원숭이두창에 감염된 후 예후는 이전의 예방접종력, 감염 초기 건강상태, 기저질환 등의 요인에 따라 다르게 나타날 수 있으므로 의사의 진료에 따라 증상에 맞는 적절한 치료를 받아야 합니다.</p>';
    $("#contentbox").html(html);
}

function preventive(){
    let html = '<h2 class="content_title">예방법</h2>'+
               '<h3 class="content_subtitle">예방백신</h3>'+
               '<p class="content_text">국내 비축하고 있는 두창 백신은 생물테러 또는 국가의 공중보건 위기 상황 시 사용할 목적으로 비축하고 있는 것으로, 현재 원숭이 두창 예방목적의 상용화된 백신은 없습니다.</p><br>'+
               '<h3 class="content_subtitle">예방을 위한 주의사항</h3>'+
               '<p class="content_text">원숭이두창에 감염된 사람, 감염된 동물(원숭이 및 설치류 등), 또는 바이러스에 오염된 물질과 접촉할 경우 감염될 수 있으므로 다음을 주의합니다.</p>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">감염된(감염의 위험이 있는) 사람 또는 동물과의 직‧간접적 접촉을 피합니다.</li>'+
                   '<li class="content_li">감염된 환자가 사용한 물품(린넨과 같은 침구류 등)과의 접촉을 피합니다.</li>'+
                   '<li class="content_li">의심되는 사람, 동물 또는 물건과 접촉을 한 경우, 비누와 물로 손을 씻거나 알코올 성분의 손 소독제를 이용하여 깨끗이 합니다.</li>'+
                   '<li class="content_li">원숭이두창이 발생하는 곳을 여행하는 경우, 바이러스를 보유할 수 있는 동물과의 접촉을 피합니다.</li>'+
                '</ul>';
    $("#contentbox").html(html);
}

function img(){
    let html = '<td>발진 사진</td>'+
               '<td><img class="minfoimg" src="/img/1_mp.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/2_vl.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/3_hz.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/4_hs.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/5_ml.jpg"></td>';
    $("#table_img").html(html);
}

