// UPDATE Button
const updateCheck = () => {
    let cnt = 0;
    let id = "";
    let level = "";
    let koreanLang = "";
    let englishLang = "";
    let updateInputListId = document.querySelectorAll(".speakCheckBoxList");
    let updateInputLevelId = document.querySelectorAll(".levelClass");
    let updateInputKoreanId = document.querySelectorAll(".koreanClass");
    let updateInputEnglishId = document.querySelectorAll(".englishClass");

    
    for (var i = 0; i < updateInputListId.length; i++) {
        if (updateInputListId[i].checked == true) {
            // if(updateInputListQuestion[i].value == ""){
            //     alert("입력되지 않은 질문이 있습니다.");
            //     updateInputListQuestion[i].focus();
            //     return;
            // }

            // if(updateInputListAnswer[i].value == ""){
            //     alert("입력되지 않은 질문이 있습니다.");
            //     updateInputListAnswer[i].focus();
            //     return;
            // }
            console.log(i);
            cnt++;
            id += updateInputListId[i].value + ",";
            level += updateInputLevelId[i].value + ",";
            koreanLang += updateInputKoreanId[i].value + ",";
            englishLang += updateInputEnglishId[i].value + ",";
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
    level = level.substring(0, level.length - 1);
    koreanLang = koreanLang.substring(0, koreanLang.length - 1);
    englishLang = englishLang.substring(0, englishLang.length - 1);

    console.log("id==>",id);
    console.log(level);
    console.log(koreanLang);
    console.log(englishLang);

    let data = [{ id }, { level }, {koreanLang}, {englishLang}];

    fetch("/meaning/meaning_update",
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

/*
    DELETE Button
*/
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
    console.log(values);
    let data = { values : values };

    fetch("/meaning/meaning_delete",
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