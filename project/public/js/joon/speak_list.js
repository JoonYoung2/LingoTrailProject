// Search
const speakListSearch = () => {
    let searchId = document.getElementById("speakListSearch");
    let data = {searchId : searchId.value};

    if(searchId.value == ""){
        location.reload();
        return;
    }
    fetch("/speak_question/speak_search_list", 
    {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.input.searchId);
        if(data.data === undefined){
            let speakListTableId = document.getElementById('speakListTable');
            let msg = `
                <tr>
                    <td colspan="7">
                        <input id="speakListSearch" class="speakListSearch" type="text" placeholder="search" onchange="speakListSearch();" value='${data.input.searchId}'>
                    </td>
                </tr>
                <tr>
                    <th>NO</th>
                    <th style="width:400px;">QUESTION</th>
                    <th style="width:400px;">ANSWER</th>
                    <th style="width:100px;">QLANGUAGE</th>
                    <th style="width:100px;">ALANGUAGE</th>
                    <th style="width:100px;">LEVEL</th>
                    <th><button id="allSelectButton" onclick="checkSelectAll();">전체</button></th>
                </tr>
                <tr>
                    <td colspan="7">
                        등록된 내용이 없습니다.
                    </td>
                </tr>
            `
            speakListTableId.innerHTML = msg;
            msg = "";
            return;
        }
        let speakListTableId = document.getElementById('speakListTable');
        let msg = "";
        msg += 
        `<tr>
            <td colspan="7">
                <input id="speakListSearch" class="speakListSearch" type="text" placeholder="search" onchange="speakListSearch();" value='${data.input.searchId}'>
            </td>
        </tr>
        <tr>
            <th>NO</th>
            <th>QUESTION</th>
            <th>ANSWER</th>
            <th>QLANGUAGE</th>
            <th>ALANGUAGE</th>
            <th>LEVEL</th>
            <th><button id="allSelectButton" onclick="checkSelectAll();">전체</button></th>
        </tr>
        `;
        data.data.forEach((list) => {
            msg+=
            `
                <tr>
                    <td>
                        ${ list.ID }
                    </td>
                    <td>
                        <input type="text" class="speakQuestion" value="${list.QUESTION}">
                    </td>
                    <td>
                        <input type="text" class="speakAnswer" value="${ list.ANSWER }">
                    </td>
                    <td>
                        <select class="speakQlanguage">
            `;
            data.language.forEach((lang) => {
                msg+=
                `
                    <option value="${ lang.ID }"`;
                   
                        if(lang.ID == list.QLANGUAGE){
                    
                            msg+=`selected`;
                    
                        }
                    
                    msg += `>${ lang.LANGUAGE }</option>`;
            })

            msg += 
            `
                </select>
                </td>
                <td>
                                <select class="speakAlanguage">
                    `;
                    data.language.forEach((lang) => {
                        msg+=
                        `
                            <option value="${ lang.ID }"`;
                        
                                if(lang.ID == list.ALANGUAGE){
                            
                                    msg+=`selected`;
                            
                                }
                            
                            msg += `>${ lang.LANGUAGE }</option>`;
                    })

                    msg += 
                    `
                        </select>
                </td>
                <td>
                    <select class="speakLevel">
            `;
            data.level.forEach((level) => {
                msg += `<option value="${level.ID}"`;
                    if(level.ID == list.LEVEL_STEP){
                        msg += `selected`
                    }
                    msg += `>${ level.LEVEL_STEP } Level</option>`;
            })
            
            msg += 
            `
            </select>
                </td>
                <td class="speakCheckBox">
                    <input type="checkbox" onclick="checkItemsClick();" class="speakCheckBoxList" name="id" value="${ list.ID }">
                </td>
            </tr>
            `
            console.log(msg);
            speakListTableId.innerHTML=msg;
        })
    })
    msg = "";
    return;
}

// Register
const listInsert = () => {
    let formId = document.getElementById("formId");
    let questionId = document.getElementById("questionId");
    let answerId = document.getElementById("answerId");

    if(questionId.value === ""){
        alert("QEUSTION을 입력해주세요.");
        questionId.focus();
        return;
    }else if(answerId.value === ""){
        alert("ANSWER을 입력해주세요.");
        answerId.focus();
        return;
    }

    formId.submit();
}

// INSERT Button
const insertCheck = () => {
    let insertBtnChange = document.getElementById("speakGameListButtons");
    insertBtnChange.innerHTML = `<button onclick="insertCheckCancel();">INSERT</button>`
    let msg = "";
    fetch("/speak_question/speak_insert_list",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            let language = result.language;
            let maxId = result.maxId;
            let level = result.level;
            const insertZone = document.getElementById("insertZone");
            msg = `
            <form action="/speak_question/speak_insert" method="post" id="formId">
            <div style="padding: 50px 0px;">
                <table border='1'>
                    <tr>
                        <th>NO</th>
                        <th>QUESTION</th>
                        <th>ANSWER</th>
                        <th>QLANGUAGE</th>
                        <th>ALANGUAGE</th>
                        <th>LEVEL</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="id" class="speakId" value="${maxId}" readonly>
                        </td>
                        <td>
                            <input type="text" id="questionId" name="question" class="speakQuestion" value="">
                        </td>
                        <td>
                            <input type="text" id="answerId" name="answer" class="speakAnswer" value="">
                        </td>
                        <td>
                            <select name="qlanguage" class="speakLanguage">`;
                                language.forEach((lang) => {
                                    msg += 
                                    `
                                    <option value="${lang.ID}">${ lang.LANGUAGE }</option>
                                    `
                                })
                        msg +=
                        `
                            </select>
                        </td>
                            <td>
                            <select name="alanguage" class="speakLanguage">`;
                                language.forEach((lang) => {
                                    msg += 
                                    `
                                    <option value="${lang.ID}">${ lang.LANGUAGE }</option>
                                    `
                                })
                        msg +=
                        `
                            </select>
                        </td>
                        <td>
                            <select name="level" class="speakLevel">
                        `
                                level.forEach((level) => {
                                    msg += `<option value="${ level.ID }">${level.LEVEL_STEP} Level</option>`
                                })
                        msg +=
                        `
                            </select>
                        </td>
                        <td class="speakCheckBox">
                            <button type="button" onclick="listInsert();">등록</button>
                        </td>
                    </tr>
                </table>
                </div>
                </form>
                `
        insertZone.innerHTML = msg;
        msg = "";
        })
}

// UPDATE Button
const updateCheck = () => {
    let cnt = 0;
    let id = "";
    let question = "";
    let answer = "";
    let qlanguage = "";
    let alanguage = "";
    let level = "";
    let updateInputListId = document.querySelectorAll(".speakCheckBoxList");
    let updateInputListQuestion = document.querySelectorAll(".speakQuestion");
    let updateInputListAnswer = document.querySelectorAll(".speakAnswer");
    let updateInputListQlanguage = document.querySelectorAll(".speakQlanguage");
    let updateInputListAlanguage = document.querySelectorAll(".speakAlanguage");
    let updateInputListLevel = document.querySelectorAll(".speakLevel");

    
    for (var i = 0; i < updateInputListId.length; i++) {
        if (updateInputListId[i].checked == true) {
            if(updateInputListQuestion[i].value == ""){
                alert("입력되지 않은 질문이 있습니다.");
                updateInputListQuestion[i].focus();
                return;
            }

            if(updateInputListAnswer[i].value == ""){
                alert("입력되지 않은 질문이 있습니다.");
                updateInputListAnswer[i].focus();
                return;
            }

            cnt++;
            id += updateInputListId[i].value + ",";
            question += updateInputListQuestion[i].value + ",";
            answer += updateInputListAnswer[i].value + ",";
            qlanguage += updateInputListQlanguage[i].value + ",";
            alanguage += updateInputListAlanguage[i].value + ",";
            level += updateInputListLevel[i].value + ",";
        }
    }

    if (cnt == 0) {
        alert("선택된 정보가 없습니다.");
        return;
    }

    if (window.confirm("정말 수정하시겠습니까?")) {

    }else{
        return;
    }

    id = id.substring(0, id.length - 1);
    question = question.substring(0, question.length - 1);
    answer = answer.substring(0, answer.length - 1);
    qlanguage = qlanguage.substring(0, qlanguage.length - 1);
    alanguage = alanguage.substring(0, alanguage.length - 1);
    level = level.substring(0, level.length - 1);

    let data = [{ id }, { question }, {answer}, {qlanguage}, {alanguage}, {level}];

    fetch("/speak_question/speak_update",
        {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result === 1) {
                
                location.reload();
            
            }
        })
}

// DELETE Button
const deleteCheck = () => {
    let cnt = 0;
    let values = "";
    let deleteInputList = document.querySelectorAll(".speakCheckBoxList");
    for (var i = 0; i < deleteInputList.length; i++) {
        if (deleteInputList[i].checked == true) {
            cnt++;
            values += deleteInputList[i].value + ",";
        }
    }

    if (cnt == 0) {
        alert("선택된 정보가 없습니다.");
        return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {

    }else{
        return;
    }

    values = values.substring(0, values.length - 1);

    let data = { values : values };

    fetch("/speak_question/speak_delete",
        {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result === 1) {
                
                location.reload();
            
            }
        })
}