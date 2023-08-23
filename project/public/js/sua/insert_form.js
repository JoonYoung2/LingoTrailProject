const valid = () => {
    let koreanLang = document.getElementById("koreanLang");
    let englishLang = document.getElementById("englishLang");
    let formId = document.getElementById("formId");

    if(koreanLang.value == ""){
        alert("빈칸을 입력해주세요");
        koreanLang.focus();
        return;
    }
    if(englishLang.value == ""){
        alert("빈칸을 입력해주세요");
        englishLang.focus();
        return;
    }

    formId.submit();
}