// Search
const blankListSearch = () => {
    let searchId = document.getElementById("blankListSearch");
    let data = {searchId : searchId.value};

    if(searchId.value == ""){
        location.reload();
        return;
    }
    fetch("/blank_question/blank_search_list", 
    {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.input.searchId);
        if(data.data === undefined){
            let blankListTableId = document.getElementById('blankListTable');
            let msg = `
                <tr>
                    <td colspan="7">
                        <input id="blankListSearch" class="blankListSearch" type="text" placeholder="search" onchange="blankListSearch();" value='${data.input.searchId}'>
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
            blankListTableId.innerHTML = msg;
            msg = "";
            return;
        }
        let blankListTableId = document.getElementById('blankListTable');
        let msg = "";
        msg += 
        `<tr>
            <td colspan="8">
                <input id="blankListSearch" class="blankListSearch" type="text" placeholder="search" onchange="blankListSearch();" value='${data.input.searchId}'>
            </td>
        </tr>
        <tr>
            <th>NO</th>
            <th>QUESTION</th>
            <th>ANSWER</th>
            <th>MEANING</th>
            <th>LANGUAGE</th>
            <th>PARTS</th>
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
                        <input type="text" class="blankQuestion" value="${list.QUESTION}">
                    </td>
                    <td>
                        <input type="text" class="blankAnswer" value="${ list.ANSWER }">
                    </td>
                    <td>
                        <input type="text" class="blankMeaning" value="${ list.MEANING }">
                    </td>
                    <td>
                        <select class="blankLanguage">
            `;
            data.language.forEach((lang) => {
                msg+=
                `
                    <option value="${ lang.ID }"`;
                   
                        if(lang.ID == list.LANGUAGE){
                    
                            msg+=`selected`;
                    
                        }
                    
                    msg += `>${ lang.LANGUAGE }</option>`;
            })

            msg += 
            `
                </select>
                </td>
                <td>
                                <select class="blankParts">
                    `;
                    data.parts.forEach((part) => {
                        msg+=
                        `
                            <option value="${ part.ID }"`;
                        
                                if(part.ID == list.parts){
                            
                                    msg+=`selected`;
                            
                                }
                            
                            msg += `>${ part.PART_NAME }</option>`;
                    })

                    msg += 
                    `
                        </select>
                </td>
                <td>
                    <select class="blankLevel">
            `;
            data.level.forEach((level) => {
                msg += `<option value="${level.ID}"`;
                    if(level.ID == list.LEVEL_STEP){
                        msg += `selected`
                    }
                    msg += `>Level ${ level.LEVEL_STEP }</option>`;
            })
            
            msg += 
            `
            </select>
                </td>
                <td class="blankCheckBox">
                    <input type="checkbox" onclick="checkItemsClick();" class="CheckBoxList" name="id" value="${ list.ID }">
                </td>
            </tr>
            `
            console.log(msg);
            blankListTableId.innerHTML=msg;
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
    let meaningId = document.getElementById("meaningId");

    if(questionId.value === ""){
        alert("QEUSTION을 입력해주세요.");
        questionId.focus();
        return;
    }else if(answerId.value === ""){
        alert("ANSWER을 입력해주세요.");
        answerId.focus();
        return;
    }else if(meaningId.value === ""){
        alert("ANSWER을 입력해주세요.");
        meaningId.focus();
    }

    formId.submit();
}

// INSERT Button
const insertCheck = () => {
    let insertBtnChange = document.getElementById("insertBtnChange");
    insertBtnChange.innerHTML = `<button onclick="insertCheckCancel();">INSERT</button>`
    let msg = "";
    fetch("/blank_question/blank_insert_list",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            let language = result.language;
            let maxId = result.maxId;
            let level = result.level;
            let parts = result.parts;
            const insertZone = document.getElementById("insertZone");
            msg = `
            <form action="/blank_question/blank_insert" method="post" id="formId">
            <div style="padding: 50px 0px;">
                <table border='1'>
                    <tr>
                        <th>NO</th>
                        <th>QUESTION</th>
                        <th>ANSWER</th>
                        <th>MEANING</th>
                        <th>LANGUAGE</th>
                        <th>PARTS</th>
                        <th>LEVEL</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="id" class="blankId" value="${maxId}" readonly>
                        </td>
                        <td>
                            <input type="text" id="questionId" name="question" class="blankQuestion" value="">
                        </td>
                        <td>
                            <input type="text" id="answerId" name="answer" class="blankAnswer" value="">
                        </td>
                        <td>
                            <input type="text" id="meaningId" name="meaning" class="blankMeaning" value="">
                        </td>
                        <td>
                            <select name="language" class="blankLanguage">`;
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
                            <select name="parts" class="blankParts">`;
                                parts.forEach((part) => {
                                    msg += 
                                    `
                                    <option value="${part.ID}">${ part.PART_NAME }</option>
                                    `
                                })
                        msg +=
                        `
                            </select>
                        </td>
                        <td>
                            <select name="level" class="blankLevel">
                        `
                                level.forEach((level) => {
                                    msg += `<option value="${ level.ID }">Level ${level.LEVEL_STEP}</option>`
                                })
                        msg +=
                        `
                            </select>
                        </td>
                        <td class="blankCheckBox">
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
    let meaning = "";
    let language = "";
    let parts = "";
    let level = "";
    let updateInputListId = document.querySelectorAll(".CheckBoxList");
    let updateInputListQuestion = document.querySelectorAll(".blankQuestion");
    let updateInputListAnswer = document.querySelectorAll(".blankAnswer");
    let updateInputListMeaning = document.querySelectorAll(".blankMeaning");
    let updateInputListLanguage = document.querySelectorAll(".blankLanguage");
    let updateInputListParts = document.querySelectorAll(".blankParts");
    let updateInputListLevel = document.querySelectorAll(".blankLevel");

    
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

            if(updateInputListMeaning[i].value == ""){
                alert("입력되지 않은 질문이 있습니다.");
                updateInputListMeaning[i].focus();
                return;
            }

            cnt++;
            id += updateInputListId[i].value + ",";
            question += updateInputListQuestion[i].value + ",";
            answer += updateInputListAnswer[i].value + ",";
            meaning += updateInputListMeaning[i].value + ",";
            language += updateInputListLanguage[i].value + ",";
            parts += updateInputListParts[i].value + ",";
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
    meaning = meaning.substring(0, meaning.length - 1);
    language = language.substring(0, language.length - 1);
    parts = parts.substring(0, parts.length - 1);
    level = level.substring(0, level.length - 1);

    let data = [{ id }, { question }, {answer}, {meaning}, {language}, {parts}, {level}];

    fetch("/blank_question/blank_update",
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
    let deleteInputList = document.querySelectorAll(".CheckBoxList");
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

    fetch("/blank_question/blank_delete",
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