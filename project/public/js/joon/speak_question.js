let cnt = 0;
let dataSize = 0;
let underBarBasicDiv;
let underBarWrongDiv;
let underBarRightDiv;
let inputText;
let text = [];
let writeText = "";
let percent = 0;
let energyBarFill;
let gameLifeScore = 0;

window.onload = () => {
    let disabledConfig = document.querySelectorAll(".disabledCheck");
    energyBarFill = document.querySelectorAll(".energyBarFill");

    for (var i = 0; i < disabledConfig.length; ++i) {
        disabledConfig[i].disabled = false;
    }

    dataSize = document.getElementById('dataSize').value;

    document.getElementById('speakHeaderSection0').style.display = 'block';
    document.getElementById('underBarBasicDiv0').style.display = "flex";
    document.getElementById('questionInput0').style.display = "block";
    document.getElementById('mainPage0').style.display = "block";
}

// 건너뛰기 Button
const jumpBtn = (count1) => {
    let count = Number(count1);

    let underBarBefore = "underBarBasicDiv" + count;
    let underBarAfter = "underBarBasicDiv" + (count + 1);
    let headerBefore = "speakHeaderSection" + count;
    let headerAfter = "speakHeaderSection" + (count + 1);
    let mainPageBefore = "mainPage" + count;
    let mainPageAfter = "mainPage" + (count + 1);
    let beforeQuestion = "questionInput" + cnt;
    ++cnt;
    let afterQuestion = "questionInput" + cnt;
    let footerStartDiv = document.querySelectorAll(".footerStartDiv");
        

    text = [];
    writeText = "";
    if (cnt == dataSize) {
        alert("문제를 모두 푸셨습니다. 감사합니다.");
        location.href = "/speak_question/step";
        return;
    }
    
    for(var i = 0; i < footerStartDiv.length; i++){
        footerStartDiv[i].style.backgroundColor = "white";
    }
    document.getElementById(mainPageBefore).style.display = "none";
    document.getElementById(mainPageAfter).style.display = "block";
    document.getElementById(headerBefore).style.display = "none";
    document.getElementById(headerAfter).style.display = "block";
    document.getElementById(underBarBefore).style.display = "none";
    document.getElementById(underBarAfter).style.display = "flex";
    document.getElementById(beforeQuestion).style.display = "none";
    document.getElementById(afterQuestion).style.display = "block";
    return;
}

// 확인 Button
const CheckBtn = (count1) => {
    let count = Number(count1);
    let rightId = "rightInput" + count;
    let rightInput = document.getElementById(rightId).value + " ";
    let disabledConfig = document.querySelectorAll(".disabledCheck");

    for (var i = 0; i < disabledConfig.length; ++i) {
        disabledConfig[i].disabled = true;
        disabledConfig[i].style.backgroundColor="rgba(0, 0, 0, 0.05)";
    }

    console.log(rightInput);
    console.log(writeText);
    if (rightInput === writeText) {
        let footerStartDiv = document.querySelectorAll(".footerStartDiv");
        for(var i = 0; i < footerStartDiv.length; i++){
            footerStartDiv[i].style.backgroundColor = "rgba(160, 232, 145, 0.5)";
        }
        let underBar = "underBarBasicDiv" + count;
        let underBarRight = "underBarRightDiv" + count;
        let underBarRightDiv = document.getElementById(underBarRight);
        document.getElementById(underBar).style.display = "none";
        underBarRightDiv.style.display = "flex";
        percent = ((count + 1) / dataSize) * 100;
        for (var i = 0; i < energyBarFill.length; i++) {
            energyBarFill[i].style.width = `${percent}%`;
        }
    } else {
        gameLifeScore++;
        let gameLifeId = ".gameLife" + gameLifeScore;
        let underBar = "underBarBasicDiv" + count;
        let underBarWrong = "underBarWrongDiv" + count;
        let underBarWrongDiv = document.getElementById(underBarWrong);

        let gameLifeDocument = document.querySelectorAll(gameLifeId);
        
        for(var i = 0; i < gameLifeDocument.length; i++){
            gameLifeDocument[i].innerText = "♡";
        }

        percent = ((count + 1) / dataSize) * 100;
        for (var i = 0; i < energyBarFill.length; i++) {
            energyBarFill[i].style.width = `${percent}%`;
        }

        let footerStartDiv = document.querySelectorAll(".footerStartDiv");
        for(var i = 0; i < footerStartDiv.length; i++){
            footerStartDiv[i].style.backgroundColor = "rgba(255, 128, 128, 0.5)";
        }
        
        document.getElementById(underBar).style.display = "none";
        underBarWrongDiv.style.display = "flex";
    }
    return;
}

// User가 단어를 Click Button
const userChooseBtn = (count1, list) => {
    let count = Number(count1);
    let ids = "userAnswerValues" + count;
    let inputTextId = "userAnswerDiv" + cnt;
    let userAnswerValues = document.getElementById(ids);
    let innerTxt = "";
    writeText += list + " ";
    console.log(writeText);
    inputText = document.getElementById(inputTextId);

    text[text.length] = { count: "<input id='inputCancel" + count + "' class='disabledCheck inputCancelItems' type='button' value='" + userAnswerValues.value + "' onclick='userChoosedCancel(" + count + ")' style='display:inline;'> " };
    text.forEach((a) => {
        console.log("a ====> ", a.count);
        if (a.count === undefined || a.count === "") {
            a.count = "";
        }
        innerTxt += a.count;
    });
    inputText.innerHTML = innerTxt;
    console.log(userAnswerValues);
    userAnswerValues.style.display = "none";
    let checkButton = document.querySelectorAll(".checkBtn");
    for(var i = 0; i < checkButton.length; i++){
        checkButton[i].style.backgroundColor = "green";
        checkButton[i].style.color = "white";
        checkButton[i].disabled = false;
    }
    return;
}

// User가 선택했던 단어 취소 Button
const userChoosedCancel = (count) => {
    let id = "inputCancel" + count;
    let ids = "userAnswerValues" + count;
    text.forEach((a) => {
        console.log(a.count.indexOf(count));
        if (a.count.indexOf(count) !== -1) {
            a.count = "";
        }
    })
    let answerCancel = document.getElementById(id);
    let userAnswerValues = document.getElementById(ids);

    let cancelText = answerCancel.value;

    writeText = writeText.replace(" " + cancelText, "");
    writeText = writeText.replace(cancelText + " ", "");
    writeText = writeText.replace(cancelText, "");

    if(writeText == ""){
        let checkButton = document.querySelectorAll(".checkBtn");
        for(var i = 0; i < checkButton.length; i++){
            checkButton[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            checkButton[i].style.color = "black";
            checkButton[i].disabled = true;
        }
    }
    answerCancel.style.display = "none";
    userAnswerValues.style.display = "inline";
    return;
}

// 확인버튼 클릭 후 정답일 때의 계속하기 Button
const rightContinueBtn = (count1) => {

    let count = Number(count1);
    let underBarBefore = "underBarBasicDiv" + count;
    let underBarAfter = "underBarBasicDiv" + (count + 1);
    let headerBefore = "speakHeaderSection" + count;
    let headerAfter = "speakHeaderSection" + (count + 1);
    let mainPageBefore = "mainPage" + count;
    let mainPageAfter = "mainPage" + (count + 1);
    let disabledConfig = document.querySelectorAll(".disabledCheck");

    console.log("percent ==> ", percent);
    for (var i = 0; i < disabledConfig.length; ++i) {
        disabledConfig[i].disabled = false;
        disabledConfig[i].style.backgroundColor = "white";
    }

    text = [];
    writeText = "";

    let afterQuestion = "questionInput" + cnt;
    ++cnt;
    let beforeQuestion = "questionInput" + cnt;

    if (cnt == dataSize) {
        alert("문제를 모두 푸셨습니다. 감사합니다.");
        location.href = "/speak_question/step";
        return;
    }

    console.log(afterQuestion);
    console.log(beforeQuestion);

    let underBar = "underBarBasicDiv" + count;
    let underBarRight = "underBarRightDiv" + count;
    let underBarRightDiv = document.getElementById(underBarRight);
    let footerStartDiv = document.querySelectorAll(".footerStartDiv");

    for(var i = 0; i < footerStartDiv.length; i++){
        footerStartDiv[i].style.backgroundColor = "white";
    }

    document.getElementById(underBar).style.display = "block";
    underBarRightDiv.style.display = "none";
    document.getElementById(mainPageBefore).style.display = "none";
    document.getElementById(mainPageAfter).style.display = "block";
    document.getElementById(headerBefore).style.display = "none";
    document.getElementById(headerAfter).style.display = "block";
    document.getElementById(underBarBefore).style.display = "none";
    document.getElementById(underBarAfter).style.display = "flex";
    document.getElementById(afterQuestion).style.display = "none";
    document.getElementById(beforeQuestion).style.display = "block";
    let checkButton = document.querySelectorAll(".checkBtn");
        for(var i = 0; i < checkButton.length; i++){
            checkButton[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            checkButton[i].style.color = "black";
            checkButton[i].disabled = true;
        }
    return;
}

// 확인버튼 클릭 후 오답일 때의 계속하기 Button
const wrongContinueBtn = (count1) => {
    let count = Number(count1);
    let underBarBefore = "underBarBasicDiv" + count;
    let underBarAfter = "underBarBasicDiv" + (count + 1);
    let headerBefore = "speakHeaderSection" + count;
    let headerAfter = "speakHeaderSection" + (count + 1);
    let mainPageBefore = "mainPage" + count;
    let mainPageAfter = "mainPage" + (count + 1);
    let disabledConfig = document.querySelectorAll(".disabledCheck");

    if(gameLifeScore >= 3){
        alert("목숨이 끊겼습니다.");
        window.history.back();
    }

    for (var i = 0; i < disabledConfig.length; ++i) {
        disabledConfig[i].disabled = false;
        disabledConfig[i].style.backgroundColor = "white";
    }

    text = [];
    writeText = "";

    let afterQuestion = "questionInput" + cnt;
    ++cnt;
    let beforeQuestion = "questionInput" + cnt;

    if (cnt == dataSize) {
        alert("문제를 모두 푸셨습니다. 감사합니다.");
        location.href = "/speak_question/step";
        return;
    }

    console.log(afterQuestion);
    console.log(beforeQuestion);

    let underBar = "underBarBasicDiv" + count;
    let underBarWrong = "underBarWrongDiv" + count;
    let underBarWrongDiv = document.getElementById(underBarWrong);


    document.getElementById(mainPageBefore).style.display = "none";
    document.getElementById(mainPageAfter).style.display = "block";
    document.getElementById(underBar).style.display = "block";
    underBarWrongDiv.style.display = "none";
    document.getElementById(headerBefore).style.display = "none";
    document.getElementById(headerAfter).style.display = "block";
    document.getElementById(underBarBefore).style.display = "none";
    document.getElementById(underBarAfter).style.display = "flex";
    document.getElementById(afterQuestion).style.display = "none";
    document.getElementById(beforeQuestion).style.display = "block";
    let checkButton = document.querySelectorAll(".checkBtn");
    for(var i = 0; i < checkButton.length; i++){
        checkButton[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        checkButton[i].style.color = "black";
        checkButton[i].disabled = true;
    }
    let footerStartDiv = document.querySelectorAll(".footerStartDiv");
    for(var i = 0; i < footerStartDiv.length; i++){
        footerStartDiv[i].style.backgroundColor = "white";
    }
    return;
}

// 다시풀기 Button
const restartBtn = (count1) => {
    let count = Number(count1);
    let disabledConfig = document.querySelectorAll(".disabledCheck");
    let userAnswerValues = document.querySelectorAll(".userAnswerValues");
    let rightAnswerId = "rightAnswer" + count;
    let rightAnswer = document.getElementById(rightAnswerId); // 정답보기
    let inputTextId = "userAnswerDiv" + cnt;
    inputText = document.getElementById(inputTextId);
    text = [];
    inputText.innerHTML = "";
    rightAnswer.innerHTML = "";
    writeText = ""

    for (var i = 0; i < disabledConfig.length; ++i) {
        disabledConfig[i].disabled = false;
        disabledConfig[i].style.backgroundColor = "white";
    }

    for (var i = 0; i < userAnswerValues.length; i++) {
        userAnswerValues[i].style.display = "inline";
    }

    let underBar = "underBarBasicDiv" + count;
    let underBarWrong = "underBarWrongDiv" + count;
    let underBarWrongDiv = document.getElementById(underBarWrong);
    document.getElementById(underBar).style.display = "flex";
    underBarWrongDiv.style.display = "none";
    let checkButton = document.querySelectorAll(".checkBtn");
    for(var i = 0; i < checkButton.length; i++){
        checkButton[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        checkButton[i].style.color = "black";
        checkButton[i].disabled = true;
    }
    let footerStartDiv = document.querySelectorAll(".footerStartDiv");
    for(var i = 0; i < footerStartDiv.length; i++){
        footerStartDiv[i].style.backgroundColor = "white";
    }
    return;
}

// 정답보기 Button
const rightViewBtn = (count1) => {
    let count = Number(count1);
    let rightId = "rightInput" + count;
    let rightInput = document.getElementById(rightId).value + " ";
    let rightAnswerId = "rightAnswer" + count;
    let rightAnswer = document.getElementById(rightAnswerId);
    rightAnswer.innerHTML = `<span style="color: red; font-size:20px;">정답 : ${rightInput}</span>`
    return;
}

// X 나가기 Button
const gameExit = () => {
    if (window.confirm("정말 그만두시겠습니까?")) {
        window.history.back();
    }
}