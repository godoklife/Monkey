

info();

function info(){
    let html = '<h2 class="content_title">什么是猴痘？</h2>'+
               '<h3 class="content_subtitle">猴痘是一种由猴痘病毒感染引起的罕见疾病，属于痘病毒科正痘病毒属。</h3>'+
               '<p class="content_text">猴天花最早是在 1958 年发现的，当时一种类似水痘的疾病在为研究而培育的猴子身上出现，因此得名“猴天花”。 猴痘感染病例于 1970 年在刚果民主共和国首次报告，当时正在努力根除天花，此后在加蓬、尼日利亚、中非共和国、科特迪瓦等中非和西非国家都有报告。 “科特迪瓦、刚果共和国和喀麦隆。”</p><br>'+
               '<p class="content_text">但从 2022 年 5 月开始，它开始主要发生在欧洲，如西班牙、英国和意大利，而在非流行国家，如美国则出现异常。</p><br>'+
               '<div class="content_divbox">'+
                    '<p class="content_text">※ 猴痘流行国家：贝宁、喀麦隆、中非共和国、刚果人民共和国、加蓬、加纳、科特迪瓦、利比里亚、尼日利亚、刚果、塞拉利昂</p>'+
               '</div><br>'+
               '<h3 class="content_subtitle">猴痘是一种人畜共患病，可通过与感染猴痘病毒的动物（鼠、松鼠、土拨鼠、猴等啮齿动物）、感染者或被病毒污染的材料接触传播。垂直感染可能发生于对胎儿。</h3>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">（飞沫）通过鼻、尾骨、咽部、粘膜和肺泡中的传染性飞沫直接在人与人之间传播</li>'+
                   '<li class="content_li">（皮肤损伤副产物）直接或间接接触受感染动物或人类的血液、体液、皮肤或粘膜损伤</li>'+
                   '<li class="content_li">（车辆）通过接触感染患者的体液或带有病灶的介质（床单、衣服等）传播</li>'+
                   '<li class="content_li">（空气）通过含有病毒的微气溶胶进行空气传播是可能的，但并不常见。</li>'+
               '</ul>';
    $("#contentbox").html(html);
}

function main_symptoms(){
    let html =  '<h2 class="content_title">临床症状和检查方法</h2>'+
    '                <h3 class="content_subtitle">临床症状</h3>'+
    '                <p class="content_text">如果你感染了猴痘，疾病的严重程度可能是轻度到中度，但会致命。</p>'+
    '                <p class="content_text">感染后，开始 1 至 2 周的潜伏期，随后出现“38°C 或更高的急性发热、头痛、肌肉疼痛和疲劳”，并在 1 至 3 天后出现<span class="boldtext">脸上皮疹</span>出现, <span class="boldtext">远端扩散到身体其他部位（尤其是四肢）</span> 淋巴结肿大是主要症状，症状通常持续 2 至 4 周。</p>'+
    '                <ul class="content_ul">'+
    '                    <li class="content_li">潜伏期：5~21天（平均7~14天）</li>'+
    '                    <li class="content_li">临床症状：发热、头痛、肌肉痛、背痛、淋巴结水肿、寒战、乏力、皮疹（发热后1-3天内）<br><span class="content_text">※ 皮疹进展为斑疹、丘疹、水疱、脓疱和结痂阶段。</span></span></li>'+
    '                    <li class="content_li">病死率：通常已知约为 1% 至 10%，根据世界卫生组织的数据，最近报告的病死率为 3% 至 6%。</li>'+
    '                </ul>'+
    '                <p class="table_title">[猴痘与其他皮肤病的区别]</p>'+
    '                <table class="table content_table">'+
    '                    <tr>'+
    '                        <th width="10%;"></th>'+
    '                        <th width="18%;">猴痘<br>(Monkeypox)</th>'+
    '                        <th width="18%;">水痘<br>(Varicella)</th>'+
    '                        <th width="18%;">带状疱疹<br>(Herpes zoster)</th>'+
    '                        <th width="18%;">单纯疱疹<br>(Herpes simplex)</th>'+
    '                        <th width="18%;">麻疹<br>(Measles)</th>'+
    '                    </tr>'+
    '                    <tr id="table_img">'+
    '                        <td class="align-middle">皮疹照片</td>'+
    '                        <td class="align-middle" colspan="5"><span class="imgbtn" onclick="img()">包含恶心的图片。 [查看照片]</span> </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">皮疹特征</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>从头部开始，发展到全身四肢</li>'+
    '                                <li>水疱喷发，边界清晰，中心空心</li>'+
    '                                <li>多为同期皮疹</li>'+
    '                                <li>手/脚参与</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>主要向身体进展，包括头部</li>'+
    '                                <li>边界不清的水疱性皮疹</li>'+
    '                                <li>每个皮疹可能有不同的阶段</li>'+
    '                                <li>手/足不常受累</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>它们可以出现在全身各处，沿着神经节呈带状出现。</li>'+
    '                                <li>局部大疱性病变</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>局部，皮肤和粘膜（眼睛、嘴唇等）都可以被侵入</li>'+
    '                                <li>它主要发生在嘴唇、嘴巴、咽部和生殖器区域。</li>'+
    '                                <li>可伴有水泡和溃疡</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>红色斑丘疹</li>'+
    '                                <li>从脸到耳后，再到躯干中央</li>'+
    '                                <li>可以剥离</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">临床图片</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>发烧+头痛+肌肉痛</li>'+
    '                                <li>可能发高烧</li>'+
    '                                <li>发烧后 1 至 4 天出现皮疹</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>头痛+肌肉痛</li>'+
    '                                <li>中度发热（低于 38.8 度）</li>'+
    '                                <li>发烧后 0 至 2 天出现皮疹</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>可能首先出现疼痛（感觉神经受累）</li>'+
    '                                <li>在运动神经受累的情况下，可能伴有瘫痪</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>在病变部位引起疼痛和瘙痒</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>发烧 + 咳嗽 + 结膜炎</li>'+
    '                                <li>前驱症状后出现皮疹</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">淋巴结肿大</td>'+
    '                        <td class="align-middle"><ul><li>主要在颈部、腋窝和腹股沟</li><li>坚硬的温柔</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>很少</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>很少</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>很少</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>很少</li></ul></td>'+
    '                    </tr>'+
    '                </table>'+
    '                <h3 class="content_subtitle">检查方法</h3>'+
    '                <p class="content_text">为了确认猴痘的诊断，需要对疑似患者的血液、皮损组织、病损液、痂进行基因检测试验。</p>';
    $("#contentbox").html(html);
}

function cure(){
    let html =  '<h2 class="content_title">治愈</h2>'+
                '<h3 class="content_subtitle">没有商业化的特异性治疗，感染者被隔离住院接受对症治疗。</h3>'+
                '<p class="content_text">感染猴痘后，预后可能因既往疫苗接种史、感染的初始健康状况和基础疾病等因素而异。</p>';
    $("#contentbox").html(html);
}

function preventive(){
    let html = '<h2 class="content_title">预防性的</h2>'+
               '<h3 class="content_subtitle">预防性疫苗</h3>'+
               '<p class="content_text">目前，尚无用于预防猴天花的市售疫苗。</p><br>'+
               '<h3 class="content_subtitle">预防措施</h3>'+
               '<p class="content_text">如果您与感染猴痘的人、受感染的动物（如猴子和啮齿动物）或任何被病毒污染的物体接触，您可能会被感染。</p>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">避免与受感染（有感染风险）的人或动物直接或间接接触。</li>'+
                   '<li class="content_li">避免接触感染者使用过的物品（如床单等床上用品）。</li>'+
                   '<li class="content_li">如果您接触过疑似人、动物或物体，请用肥皂和水洗手或使用含酒精的洗手液。</li>'+
                   '<li class="content_li">如果您前往发生猴痘的地区，请避免接触可能携带病毒的动物。</li>'+
                '</ul>';
    $("#contentbox").html(html);
}

function img(){
    let html = '<td>皮疹照片</td>'+
               '<td><img class="minfoimg" src="/img/1_mp.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/2_vl.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/3_hz.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/4_hs.jpg"></td>'+
               '<td><img class="minfoimg" src="/img/5_ml.jpg"></td>';
    $("#table_img").html(html);
}

