// 전체 or 취소 Button
const checkSelectAll = () => {
    let checkCnt = 0;
    let checkList = document.querySelectorAll(".speakCheckBoxList");
    let allSelectButton = document.getElementById("allSelectButton");

    for (var i = 0; i < checkList.length; i++) {
        if (checkList[i].checked == false) {
            checkCnt++;
        }
    }

    if (checkCnt == 0) {
        allSelectButton.innerText = "전체";
        for (var i = 0; i < checkList.length; i++) {
            checkList[i].checked = false;
        }
        return;
    }

    for (var i = 0; i < checkList.length; i++) {
        allSelectButton.innerText = "취소";
        if (checkList[i].checked == false) {
            checkList[i].checked = true;
        }
    }
}

// CheckBox Button
const checkItemsClick = () => {
    let checkCnt = 0;
    let allChecked = document.querySelectorAll(".speakCheckBoxList");
    let allSelectButton = document.getElementById("allSelectButton");
    for (var i = 0; i < allChecked.length; i++) {
        if (allChecked[i].checked == false) {
            checkCnt++;
            break;
        }
    }

    if (checkCnt == 0) {
        allSelectButton.innerText = "취소";
    } else {
        allSelectButton.innerText = "전체";
    }
}

// INSERT Button Cancel
const insertCheckCancel = () => {
    document.getElementById("insertZone").innerText = "";
    let insertBtnChange = document.getElementById("speakGameListButtons");
    insertBtnChange.innerHTML = `<button onclick="insertCheck();">INSERT</button>`
}