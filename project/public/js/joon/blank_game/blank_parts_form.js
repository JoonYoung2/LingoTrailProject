// Language Insert
const listInsert = () => {
    let formId = document.getElementById("formId");
    let partsInput = document.getElementById("partsInput");

    if(partsInput.value === ""){
        alert("NAME을 입력해주세요.");
        partsInput.focus();
        return;
    }

    formId.submit();
}

// INSERT Button
const insertCheck = () => {
    let insertBtnChange = document.getElementById("insertBtnChange");
    insertBtnChange.innerHTML = `<button onclick="insertCheckCancel();">INSERT</button>`
    let msg = "";
    fetch("/blank_question/parts_insert_list",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            let maxId = result.maxId;
            const insertZone = document.getElementById("insertZone");
            msg = `
            <form action="/blank_question/parts_insert" method="post" id="formId">
            <div style="padding: 50px 0px;">
                <table border='1'>
                    <tr>
                        <th>NO</th>
                        <th>LANGUAGE</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" id="partsId" name="id" class="languageId" value="${maxId}" readonly>
                        </td>
                        <td>
                            <input type="text" id="partsInput" name="partName" class="languageLanguage speakLanguage" value="">
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
    let partName = "";
    let updateInputListId = document.querySelectorAll(".CheckBoxList");
    let updateInputListPartName = document.querySelectorAll(".speakLanguage");

    
    for (var i = 0; i < updateInputListId.length; i++) {
        if (updateInputListId[i].checked == true) {
            if(updateInputListPartName[i].value == ""){
                alert("입력되지 않은 언어가 있습니다.");
                updateInputListPartName[i].focus();
                return;
            }

            cnt++;
            id += updateInputListId[i].value + ",";
            partName += updateInputListPartName[i].value + ",";
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
    partName = partName.substring(0, partName.length - 1);

    let data = [{ id }, {partName}];

    fetch("/blank_question/parts_update",
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

    if (window.confirm("Blank Game에 연관된 모든 List가 함께 삭제됩니다. \n\n삭제하시겠습니까?")) {

    }else{
        return;
    }

    values = values.substring(0, values.length - 1);

    let data = { values : values };

    fetch("/blank_question/parts_delete",
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