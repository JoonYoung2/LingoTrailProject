// Search
const blankListSearch = () => {
    let searchId = document.getElementById("blankListSearch");
    let data = { searchId: searchId.value };

    if (searchId.value == "") {
        location.reload();
        return;
    }
    fetch("/blank_question/word_search_list",
        {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.input.searchId);
            console.log(data.language);
            if (data.data === undefined) {
                let blankListTableId = document.getElementById('blankListTable');
                let msg = `
                <tr>
                    <td colspan="${data.language.length + 3}">
                        <input id="blankListSearch" class="blankListSearch" type="text" placeholder="search" onchange="blankListSearch();" value='${data.input.searchId}'>
                    </td>
                </tr>
                <tr>
                    <th>NO</th>
                    <th>PART</th>`;
                for (var i = 0; i < data.language.length; i++) {
                    msg += `<th style="width:150px;">${data.language[i].LANGUAGE}</th>`;
                }
                msg += `<th><button id="allSelectButton" onclick="checkSelectAll();">전체</button></th>
                </tr>
                <tr>
                    <td colspan="5">
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
            <td colspan="${data.language.length + 3}">
                <input id="blankListSearch" class="blankListSearch" type="text" placeholder="search" onchange="blankListSearch();" value='${data.input.searchId}'>
            </td>
        </tr>
        <tr>
            <th>NO</th>
            <th>PART</th>
            `;

            for (var i = 0; i < data.language.length; i++) {
                msg += `<th>${data.language[i].LANGUAGE}</th>`;
            }
            msg += `<th><button id="allSelectButton" onclick="checkSelectAll();">전체</button></th>
        </tr>`;

            data.data.forEach((list) => {
                msg +=
                    `
                <tr>
                    <td>
                        ${list.ID}
                    </td>
                    <td>
                                <select class="blankParts blankPartInput">
                    `;
                data.parts.forEach((part) => {
                    msg +=
                        `
                            <option value="${part.ID}"`;

                    if (part.ID == list.PART_ID) {

                        msg += `selected`;

                    }

                    msg += `>${part.PART_NAME}</option>`;
                })

                msg +=
                    `
                        </select>
                </td>`;
                for (var i = 0; i < data.language.length; i++) {
                    if (list[data.language[i].LANGUAGE] == null) {
                        list[data.language[i].LANGUAGE] = "";
                    }
                    msg += `<td><input type="text" value="${list[data.language[i].LANGUAGE]}" class="speakWordInput blankWordInput${i}"></td>`
                }
                msg += `
                <td class="blankCheckBox">
                    <input type="checkbox" onclick="checkItemsClick();" class="CheckBoxList" name="id" value="${list.ID}">
                </td>
            </tr>`
                console.log(msg);
                blankListTableId.innerHTML = msg;
            })
        })
    msg = "";
    return;
}

// Register
const listInsert = () => {
    let formId = document.getElementById("formId");
    let insertInput = document.querySelectorAll(".wordInsertInput");
    for (var i = 0; i < insertInput.length; i++) {
        if (insertInput[i].value == "") {
            alert('빈칸을 입력해주세요.');
            insertInput[i].focus();
            return;
        }
    }
    formId.submit();
}

// INSERT Button
const insertCheck = () => {
    let insertBtnChange = document.getElementById("insertBtnChange");
    insertBtnChange.innerHTML = `<button onclick="insertCheckCancel();">INSERT</button>`
    let msg = "";
    fetch("/blank_question/word_insert_list",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            let maxId = result.maxId;
            let langName = result.language;
            let parts = result.parts
            const insertZone = document.getElementById("insertZone");
            msg = `
            <form action="/blank_question/word_insert" method="post" id="formId">
            <div style="padding: 50px 0px;">
                <table border='1'>
                    <tr>
                        <th>NO</th>
                        <th>PART</th>`;
            for (var i = 0; i < langName.length; i++) {
                msg += `<th>${langName[i].LANGUAGE}</th>`;
            }
            msg += `<th></th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="id" class="blankId" value="${maxId}" readonly>
                        </td>
                        <td>
                            <select name="partId" class="blankPartId">`;
            parts.forEach((list) => {
                msg += `<option value="${list.ID}">${list.PART_NAME}</option>`;
            })
            msg += `</td>`;
            for (var i = 0; i < langName.length; i++) {
                msg += `<td><input type="text" name="${langName[i].LANGUAGE}"class="blankWordInput wordInsertInput"></td>`;
            }
            msg += `<td class="blankCheckBox">
                            <button type="button" onclick="listInsert();">등록</button>
                        </td>
                    </tr>
                </table>
                </div>
                </form>
                `;
            insertZone.innerHTML = msg;
            msg = "";
        })
}

// UPDATE Button
const updateCheck = (languageLength) => {
    let cnt = 0;
    let id = "";
    let partId = "";
    let updateInputListId = document.querySelectorAll(".CheckBoxList");
    let updateInputListPartId = document.querySelectorAll(".blankPartInput");
    let tmp = [];
    let updateInputValues = [""];
    let count = 0;
    for (var i = 0; i < languageLength; i++) {
        let inputMsg = ".blankWordInput" + i;
        tmp[i] = document.querySelectorAll(inputMsg);
    }

    for (var i = 0; i < updateInputListId.length; i++) {
        if (updateInputListId[i].checked == true) {
            for (var j = 0; j < languageLength; j++) {
                if (tmp[j][i].value == "") {
                    alert("빈칸을 채워주세요.");
                    tmp[j][i].focus();
                    return;
                }
                updateInputValues[cnt] += tmp[j][i].value + ",";
            }
            updateInputValues[cnt] = updateInputValues[cnt].replace("undefined", "");
            updateInputValues[cnt] = updateInputValues[cnt].substring(0, (updateInputValues[cnt].length - 1));
            id += updateInputListId[i].value + ",";
            partId += updateInputListPartId[i].value + ",";
            cnt++;
        }
    }
    console.log(updateInputValues);
    if (cnt == 0) {
        alert("선택된 정보가 없습니다.");
        return;
    }

    if (window.confirm("정말 수정하시겠습니까?")) {

    } else {
        return;
    }

    id = id.substring(0, id.length - 1);
    partId = partId.substring(0, partId.length - 1);

    let data = [{ id }, { partId }, updateInputValues];

    fetch("/blank_question/word_update",
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

    } else {
        return;
    }

    values = values.substring(0, values.length - 1);

    let data = { values: values };

    fetch("/blank_question/word_delete",
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