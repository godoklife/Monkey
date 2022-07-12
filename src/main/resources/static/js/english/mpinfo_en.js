

info();

function info(){
    let html = '<h2 class="content_title">What is Monkeypox?</h2>'+
               '<h3 class="content_subtitle_en">Monkeypox is a disease caused by the monkeypox virus. It is a viral zoonotic disease, meaning that it can spread from animals to humans. It can also spread between people.</h3>'+
               '<p class="content_text_en">Monkeypox was first discovered in 1958 when a disease similar to chickenpox developed in monkeys bred for research, giving it the name "Monkeypox". The case of Monkeypox infection was first reported in the Democratic Republic of Congo in 1970 when efforts were being made to eradicate smallpox, and since then it has been reported in Central and West African countries such as Gabon, Nigeria, Central African Republic, Ivory Coast, Congo Republic, and Cameroon.</p><br>'+
               '<p class="content_text_en">However, since May 2022, it has started to occur mainly in Europe, such as Spain, the UK, and Italy, and has been unusual in countries that are not endemic, such as the United States.</p><br>'+
               '<div class="content_divbox">'+
                    '<p class="content_text_en">※ Monkeypox endemic countries: Benin, Cameroon, Central African Republic, People\'s Republic of Congo, Gabon, Ghana, Ivory Coast, Liberia, Nigeria, Congo, Sierra Leone</p>'+
               '</div><br>'+
               '<h3 class="content_subtitle_en">Monkeypox is a zoonotic disease that can be transmitted through contact with animals infected with the monkeypox virus (rodents such as rats, squirrels, prairie dogs and monkeys), an infected person, or a material contaminated with the virus, and the mother becomes infected through the placenta. Vertical transmission may occur from to the fetus.</h3>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">(droplet) Direct human-to-human transmission by infectious droplets in the nose, oral cavity, pharynx, mucous membranes, and alveoli</li>'+
                   '<li class="content_li">(Skin lesion by-products) Direct or indirect contact with blood, body fluids, skin, or mucosal lesions of infected animals or humans</li>'+
                   '<li class="content_li">(Medium) Transmission through contact with the body fluid of an infected patient or a medium (linen, clothing, etc.) with the lesion on it</li>'+
                   '<li class="content_li">(Air) Air transmission through micro-aerosols containing viruses is possible, but not common.</li>'+
               '</ul>';
    $("#contentbox").html(html);
}

function main_symptoms(){
    let html =  '<h2 class="content_title">Clinical symptoms and test methods</h2>'+
    '                <h3 class="content_subtitle_en">Clinical symptoms</h3>'+
    '                <p class="content_text_en">If you are infected with monkeypox, the disease can be mild to moderate but fatal.</p>'+
    '                <p class="content_text_en">After infection, after an incubation period of 1 to 2 weeks, it begins with ‘acute fever of 38°C or higher, headache, muscle pain, and fatigue’, and after 1 to 3 days <span class="boldtext">Rash symptoms centered on the face</span> appears, <span class="boldtext">Diffusion to other parts of the body (especially the extremities) distally</span> Lymph node swelling is the main symptom, and symptoms usually last 2 to 4 weeks.</p>'+
    '                <ul class="content_ul">'+
    '                    <li class="content_li">Incubation period : 5 to 21 days (average 7 to 14 days)</li>'+
    '                    <li class="content_li">Clinical symptoms : fever, headache, muscle pain, back pain, lymph node edema, chills, fatigue, rash (within 1-3 days after fever)<br><span class="content_text_en">※ The rash progresses to the stages of Macules, papules, vesicles, pustules, and scabs.</span></span></li>'+
    '                    <li class="content_li">Fatality rate : It is generally known to be about 1 to 10%, and according to the WHO, the fatality rate has recently been reported to be 3 to 6%.</li>'+
    '                </ul>'+
    '                <p class="table_title">[Differences between monkey pox and other skin diseases]</p>'+
    '                <table class="table content_table">'+
    '                    <tr>'+
    '                        <th width="10%;"></th>'+
    '                        <th width="18%;">Monkeypox<br>(Monkeypox)</th>'+
    '                        <th width="18%;">Varicella<br>(Varicella)</th>'+
    '                        <th width="18%;">Herpes zoster<br>(Herpes zoster)</th>'+
    '                        <th width="18%;">Herpes simplex<br>(Herpes simplex)</th>'+
    '                        <th width="18%;">Measles<br>(Measles)</th>'+
    '                    </tr>'+
    '                    <tr id="table_img">'+
    '                        <td class="align-middle">rash photo</td>'+
    '                        <td class="align-middle" colspan="5"><span class="imgbtn" onclick="img()">Contains disgusting photos. [Check photo]</span> </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">rash features</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Start with the head and progress to the whole body limbs</li>'+
    '                                <li>Vesicular eruption with clear boundaries and hollow center</li>'+
    '                                <li>Mostly the same stage rash</li>'+
    '                                <li>Invasion of the hand/foot</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Progressing mainly towards the body, including the head</li>'+
    '                                <li>Vesicular rash with unclear boundaries</li>'+
    '                                <li>Each rash may have different stages</li>'+
    '                                <li>Rarely involved in the hands/foot</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>They can appear all over the body and appear in bands along the ganglia.</li>'+
    '                                <li>Localized bullous lesions</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Locally, both skin and mucous membranes (eyes, lips, etc.) can be invaded</li>'+
    '                                <li>It mainly occurs on the lips, mouth, pharynx, and genital area.</li>'+
    '                                <li>Can be accompanied by blisters and ulcers</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>red maculopapular rash</li>'+
    '                                <li>From the face to behind the ears, then to the center of the torso</li>'+
    '                                <li>can be peeled off</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">clinical picture</td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>It starts with fever + headache + muscle pain.</li>'+
    '                                <li>high fever possible</li>'+
    '                                <li>Rash onset 1 to 4 days after fever</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Start with headache + muscle pain</li>'+
    '                                <li>Moderate fever (less than 38.8 degrees)</li>'+
    '                                <li>Rash onset 0 to 2 days after fever</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Pain may appear first (sensory nerve involvement)</li>'+
    '                                <li>In case of motor nerve involvement, paralysis may be accompanied</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Causes pain and itching at the site of the lesion</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                        <td class="align-middle">'+
    '                            <ul>'+
    '                                <li>Fever + Cough + Conjunctivitis</li>'+
    '                                <li>Occurrence of rash after prodromal symptoms</li>'+
    '                            </ul>'+
    '                        </td>'+
    '                    </tr>'+
    '                    <tr>'+
    '                        <td class="align-middle">lymph node enlargement</td>'+
    '                        <td class="align-middle"><ul><li>Mainly in the neck, armpits, and groin</li><li>hard tenderness</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>Rarely</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>Rarely</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>Rarely</li></ul></td>'+
    '                        <td class="align-middle"><ul><li>Rarely</li></ul></td>'+
    '                    </tr>'+
    '                </table>'+
    '                <h3 class="content_subtitle_en">inspection method</h3>'+
    '                <p class="content_text_en">In order to confirm the diagnosis of monkey pox, a gene detection test using the blood of a suspected patient, the tissue of the skin lesion, the fluid of the lesion, and the scab is required.</p>';
    $("#contentbox").html(html);
}

function cure(){
    let html =  '<h2 class="content_title">Cure</h2>'+
                '<p class="content_text_en">Monkeypox symptoms often resolve on their own without the need for treatment. It is important to take care of the rash by letting it dry if possible or covering with a moist dressing to protect the area if needed. Avoid touching any sores in the mouth or eyes. Mouth rinses and eye drops can be used as long as cortisone-containing products are avoided. Vaccinia immune globulin (VIG) may be recommended for severe cases. An antiviral that was developed to treat smallpox (tecovirimat, commercialized as TPOXX) was also approved for the treatment of monkeypox in January 2022.</p>';
    $("#contentbox").html(html);
}

function preventive(){
    let html = '<h2 class="content_title">Preventive</h2>'+
               '<h3 class="content_subtitle_en">preventive vaccine</h3>'+
               '<p class="content_text_en">Currently, there is no commercially available vaccine for the prevention of monkeypox.</p><br>'+
               '<h3 class="content_subtitle_en">Precautions for Prevention</h3>'+
               '<p class="content_text_en">If you come into contact with a person infected with monkeypox, an infected animal (such as monkeys and rodents), or anything contaminated with the virus, be aware of the following:</p>'+
               '<ul class="content_ul">'+
                   '<li class="content_li">Avoid direct or indirect contact with infected (at risk of infection) people or animals.</li>'+
                   '<li class="content_li">Avoid contact with items used by the infected person (such as linen and bedding).</li>'+
                   '<li class="content_li">If you have come into contact with a suspected person, animal or object, wash your hands with soap and water or use an alcohol-based hand sanitizer.</li>'+
                   '<li class="content_li">If you are traveling to an area where monkeypox occurs, avoid contact with animals that may carry the virus.</li>'+
                '</ul>';
    $("#contentbox").html(html);
}

function img(){
    let html = '<td>rash photo</td>'+
               '<td><img src="/img/1_mp.jpg"></td>'+
               '<td><img src="/img/2_vl.jpg"></td>'+
               '<td><img src="/img/3_hz.jpg"></td>'+
               '<td><img src="/img/4_hs.jpg"></td>'+
               '<td><img src="/img/5_ml.jpg"></td>';
    $("#table_img").html(html);
}

