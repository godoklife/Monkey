

info();

function info(){
    let html = '<h2 class="content_title">猿の斗とは？</h2>'+
               '<h3 class="content_subtitle">猿頭唐（Monkeypox）は猿頭唐ウイルス（Monkeypox virus）に感染して発生する希少疾患で、poxviridaeとのOrthopoxvirus属に属します。</h3>'+
               '<p class="content_text">猿頭唱は、1958年に研究のために飼育された猿で水痘に似た病気が発生したときに最初に発見され、「猿豆昌」と名付けられました。 猿頭唱に感染した事例は、斗昌退治に努めた1970年コンゴ民主共和国で初めて報告され、以後ガボン、ナイジェリア、中央アフリカ共和国、コートジブアル、コンゴ共和国、カメルーンなど中・西アフリカ諸国で報告され、風土病 化されました。</p><br>'+
               '<p class="content_text">しかし、2022年5月以降、スペイン、イギリス、イタリアなどヨーロッパを中心に発生し始め、米国など風土病ではない国で異例的に発生しました。</p><br>'+
               '<div class="content_divbox">'+
                    '<p class="content_text">※ 猿豆昌風土病国：ベナン、カメルーン、中央アフリカ共和国、コンゴ民衆共和国、ガボン、ガーナ、コートジブアル、リベリア、ナイジェリア、コンゴ、シエラレオネ</p>'+
               '</div><br>'+
               '<h3 class="content_subtitle">猿頭唱は、猿頭咽頭ウイルスに感染した動物（マウス、リス、プレリドッグなどのげっ歯類やサルなど）、感染した人やウイルスに汚染された物質と接触すると感染する可能性があり、胎盤を介して感染した母体 から胎児に垂直感染が発生することがあります。</h3>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">（鼻馬）鼻、クガン、咽頭、粘膜、肺胞にある感染鼻馬による人間直接伝播</li>'+
                   '<li class="content_li">（皮膚病変副産物）感染した動物・人の血液、体液、皮膚、粘膜病変との直間接接触</li>'+
                   '<li class="content_li">（媒介物）感染患者の体液、病変がある媒介体（リネン、衣服など）接触による伝播</li>'+
                   '<li class="content_li">（空気）ウイルスを含むマイクロエアロゾルを介した空気伝播は可能ですが一般的ではありません</li>'+
               '</ul>';
    $("#contentbox").html(html);
}

function main_symptoms(){
    let html =  '<h2 class="content_title">臨床症状および検査方法</h2>'+
    '                <h3 class="content_subtitle">臨床症状</h3>'+
    '                <p class="content_text">猿頭咽頭に感染した場合、病気の程度は軽度で中等度または致命的である可能性があります。</p>'+
    '                <p class="content_text">感染になると1～2週間の潜伏期間を過ぎ、「38℃以上の急性発熱、頭痛、筋肉痛、疲労感など」で始まり、1～3日後<span class="boldtext">顔を中心に発疹症状</span>が現れ、, <span class="boldtext">遠心型で身体の他の部位（特に四肢）に拡散</span>します。 リンパ節浮腫が主な症状として現れ、症状は通常2〜4週間続きます。</p>'+
    '                <ul class="content_ul">'+
    '                    <li class="content_li">潜伏期間：5〜21日（平均7〜14日）</li>'+
    '                    <li class="content_li">臨床症状：発熱、頭痛、筋肉痛、腰痛、リンパ節浮腫、悪寒、疲労、発疹（発熱後約1～3日以内）<br><span class="content_text">※ 発疹は、斑点（Macules）、丘疹（Papules）、水疱（Vesicles）、膿疱（Pustules）、ガーピー（Scabs）の段階に進行する</span></span></li>'+
    '                    <li class="content_li">致命率：一般的に約1〜10％で知られており、WHOによると最近の致命率は3〜6％と報告されています</li>'+
    '                </ul>'+
    '                <p class="table_title">[猿豆腐と他の皮膚疾患との違い]</p>'+
    '                <table class="table content_table">'+
    '                    <tr>'+
    '                        <th width="10%;"></th>'+
    '                        <th width="18%;">猿豆昌<br>(Monkeypox)</th>'+
    '                        <th width="18%;">水痘<br>(Varicella)</th>'+
    '                        <th width="18%;">対象ヘルペス<br>(Herpes zoster)</th>'+
    '                        <th width="18%;">単純ヘルペス<br>(Herpes simplex)</th>'+
    '                        <th width="18%;">はしか<br>(Measles)</th>'+
    '                    </tr>'+
    '                    <tr id="table_img">'+
    '                        <td class="align-middle">発疹の写真</td>'+
    '                        <td class="align-middle" colspan="5"><span class="imgbtn" onclick="img()">嫌悪感のある写真が含まれています。 【写真確認】</span> </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">発振の特徴</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>頭から始めて全身手足に向かって進む</li>'+
    '                                <li>境界が明確で中央が波状の水泡性発振</li>'+
    '                                <li>ほとんど同じ段階の発疹</li>'+
    '                                <li>手/足の裏に侵入</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>頭を含む主に体幹に向かって進む</li> '+
    '                                <li>境界が不明確な水疱性発疹</li>'+
    '                                <li>発振ごとに段階が異なる場合がある</li>'+
    '                                <li>手/足の裏に侵入することができない</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>体全体に現れることがあり、神経節に沿って帯状に現れる</li>'+
    '                                <li>局所部位に現れる水疱性病変</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>局所的に皮膚、粘膜（目、唇など）すべて侵襲可能</li>'+
    '                                <li>主に唇、口腔、咽頭、陰部の発生</li>'+
    '                                <li>水泡、潰瘍を伴う</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>赤い半球性発疹</li>'+
    '                                <li>顔～耳の後、以後胴中央に進む</li>'+
    '                                <li>脱皮可能</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">臨床様相</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>発熱+頭痛+筋肉痛から始まる</li>'+
    '                                <li>高熱可能</li>'+
    '                                <li>発熱1〜4日後に発疹発生</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>頭痛+筋肉痛から始まる</li>'+
    '                                <li>通常は未熱（38.8度未満）</li>'+
    '                                <li>発熱0～2日後に発疹発生</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>痛みが最初に現れることがある（感覚神経侵襲）</li>'+
    '                                <li>運動神経侵襲の場合、麻痺を伴う可能性</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>病変部位の痛み、かゆみを引き起こす</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>発熱+咳+結膜炎</li>'+
    '                                <li>前駆症状後の発疹の発生</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">リンパ節肥大</td>'+
    '                        <td class="align-middle"><ul><li>主に首、脇の下、ソ・ヘブ</li> <li>堅い圧痛</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>まれ</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>まれ</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>まれ</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>まれ</li></ul></td>'+
    '                    </tr>'+
    '                </table>'+
    '                <h3 class="content_subtitle">検査方法</h3>'+
    '                <p class="content_text">猿頭嘉確認診断のためには、疑わしい患者の血液、皮膚病変の組織及び病変の液、ガーピーなどによる遺伝子検出検査が必要です。</p>';
    $("#contentbox").html(html);
}

function cure(){
    let html =  '<h2 class="content_title">治療法</h2>'+
                '<h3 class="content_subtitle">商用化された特異治療剤はなく、感染した人は隔離入院して症状に応じた対症治療を受けることになります。</h3>'+
                '<p class="content_text">猿頭咽頭に感染した後、予後は以前の予防接種力、感染初期健康状態、基礎疾患などの要因によって異なるように見えることがあるので、医師の診療によって症状に合った適切な治療を受けなければなりません。</p>';
    $("#contentbox").html(html);
}

function preventive(){
    let html = '<h2 class="content_title">予防法</h2>'+
               '<h3 class="content_subtitle">予防ワクチン</h3>'+
               '<p class="content_text">現在、猿の頭蓋予防目的の商品化されたワクチンはありません。</p><br>'+
               '<h3 class="content_subtitle">予防のための注意事項</h3>'+
               '<p class="content_text">猿頭咽頭に感染した人、感染した動物（猿やげっ歯類など）、またはウイルスに汚染された物質と接触すると感染する可能性があるため、次の点に注意してください。</p>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">感染した（感染の危険性がある）人または動物との直接および間接的な接触を避けます。</li>'+
                   '<li class="content_li">感染した患者が使用した物品（リネンなどの寝具など）との接触を避けます。</li>'+
                   '<li class="content_li">疑われる人、動物、または物と接触した場合は、石鹸と水で手を洗うか、アルコール成分の手の消毒剤を使用してきれいにします。</li>'+
                   '<li class="content_li">猿の頭が発生する場所を旅行する場合は、ウイルスを保持できる動物との接触を避けます。</li>'+
                '</ul>';
    $("#contentbox").html(html);
}

function img(){
    let html = '<td>発疹の写真</td>'+
               '<td><img class="minfoimg" src="/img/1_mp.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/2_vl.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/3_hz.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/4_hs.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/5_ml.jpg"></td>';
    $("#table_img").html(html);
}

