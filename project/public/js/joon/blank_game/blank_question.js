let userChooseValue = 0;
let energyBarFill;
let gameLifeScore = 0;
let percent = 0;
let dataSize = 0;
let userHeart = 0;
let score = 0;
let pointScore = 0;
let gameScore = 0;

    window.onload = () => {
        energyBarFill = document.querySelectorAll(".energyBarFill");
        userHeart = document.getElementById("userHeart").value;
        document.getElementById('section0').style.display="flex";
        dataSize = Number(document.getElementById('dataSize').value);
        let gameLevel = document.getElementById('chooseLevel').value;
        pointScore = gameLevel * 5;
    }

    /*
        choose button
    */
    const userChoose = (choose, cnt) => {
        let checkBtn = document.querySelectorAll(".checkBtn");
        let chooseId = 'userChoose' + choose;
        let userChoose = document.getElementById(chooseId);
        let userChooseAll = document.querySelectorAll(".userChoose");
        userChooseValue = userChoose.value;
        for(var i = 0; i < userChooseAll.length; i++){
            userChooseAll[i].style.backgroundColor = "white";
        }
        userChoose.style.backgroundColor="rgba(0,0,0,0.1)";
        checkBtn[Number(cnt)].style.backgroundColor = "white";
    }

    /*
        확인 button
    */
    const check = (cnt, result, meaning) => {
        let chooseItems = document.querySelectorAll(".userChoose");
        let count = Number(cnt);
        if(userChooseValue == ""){
            return;
        }
        for(var i = 0; i < chooseItems.length; i++){
            chooseItems[i].disabled = true;
        }
        
        if(result == userChooseValue){
            gameScore+=pointScore;
            let rightId = 'rightMeaning' + cnt;
            let rightDivButtonId = 'rightDivButton' + cnt;
            let basicDivButtonId = 'basicDivButton' + cnt;
            let rightMeaning = document.getElementById(rightId);
            let rightDivButton = document.getElementById(rightDivButtonId);
            let basicDivButton = document.getElementById(basicDivButtonId);
            let footerSection = document.querySelectorAll(".blank_footer_section");
            percent = ((count + 1) / dataSize) * 100;
            console.log(percent);

            for (var i = 0; i < energyBarFill.length; i++) {
                energyBarFill[i].style.width = `${percent}%`;
            }
            rightDivButton.style.display = "flex";
            basicDivButton.style.display = "none";
            rightMeaning.innerText = meaning;
            footerSection[cnt].style.backgroundColor = "green";
            
            
        }else{
            gameLifeScore++;
            let gameLifeId = ".gameLife" + gameLifeScore;
            let wrongId = 'wrongMeaning' + cnt;
            let wrongDivButtonId = 'wrongDivButton' + cnt;
            let basicDivButtonId = 'basicDivButton' + cnt;
            let wrongMeaning = document.getElementById(wrongId);
            let wrongDivButton = document.getElementById(wrongDivButtonId);
            let basicDivButton = document.getElementById(basicDivButtonId);
            let footerSection = document.querySelectorAll(".blank_footer_section");

            let gameLifeDocument = document.querySelectorAll(gameLifeId);
        
            for(var i = 0; i < gameLifeDocument.length; i++){
                gameLifeDocument[i].innerText = "♡";
            }

            percent = ((count + 1) / dataSize) * 100;
            console.log(percent);

            for (var i = 0; i < energyBarFill.length; i++) {
                energyBarFill[i].style.width = `${percent}%`;
            }

            wrongDivButton.style.display = "flex";
            basicDivButton.style.display = "none";
            wrongMeaning.innerText = meaning;
            footerSection[cnt].style.backgroundColor = "red";
        }
    }

    /*
        건너뛰기 버튼
    */
    const jump = (cnt, amount) => {
        let sectionBeforeId = "section" + cnt;
        let sectionAfterId = "section" + (Number(cnt)+1);
        ++cnt
        if(cnt == amount){
            let data = {gameScore};
            fetch("/blank_question/save_score",
            {
                method : "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                alert(`문제를 모두 푸셨습니다. 감사합니다.\n\n획득점수 : ${gameScore}`);
                window.history.back();
            })                              
            return;
        }
        document.getElementById(sectionBeforeId).style.display = "none";
        document.getElementById(sectionAfterId).style.display = "flex";
    }

    /*
        right countinue button
    */
    const rightContinueButton = (cnt, amount) => {
        
        let sectionBeforeId = "section" + cnt;
        let sectionAfterId = "section" + (Number(cnt)+1);
        let sectionBefore = document.getElementById(sectionBeforeId);
        let sectionAfter = document.getElementById(sectionAfterId);
        ++cnt
        if(cnt == amount){
            let data = {gameScore};
            fetch("/blank_question/save_score",
            {
                method : "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                alert(`문제를 모두 푸셨습니다. 감사합니다.\n\n획득점수 : ${gameScore}`);
                window.history.back();
            })                              
            return;
        }
        userChooseValue="";
        sectionBefore.style.display = "none";
        sectionAfter.style.display = "flex";
        let userChooseAll = document.querySelectorAll(".userChoose");
        for(var i = 0; i < userChooseAll.length; i++){
            userChooseAll[i].style.backgroundColor = "white";
        }
        let chooseItems = document.querySelectorAll(".userChoose");
        for(var i = 0; i < chooseItems.length; i++){
            chooseItems[i].disabled = false;
        }
    }

    /*
        wrong countinue button
    */
        const wrongContinueButton = (cnt, amount) => {
            let sectionBeforeId = "section" + cnt;
            let sectionAfterId = "section" + (Number(cnt)+1);
            let sectionBefore = document.getElementById(sectionBeforeId);
            let sectionAfter = document.getElementById(sectionAfterId);
            ++cnt
            if(cnt == amount){
                let data = {gameScore};
                fetch("/blank_question/save_score",
                {
                    method : "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    alert(`문제를 모두 푸셨습니다. 감사합니다.\n\n획득점수 : ${gameScore}`);
                    window.history.back();
                })                              
                return;
            }
            if(gameLifeScore >= 3){
                if(userHeart > 0){
                    if(window.confirm(`${userHeart}개의 하트 아이템이 존재합니다.\n\n하트 아이템을 사용하시겠습니까?`)){
                        userHeart--;
                        let data = {userHeart};
                        console.log(data);
                        fetch("/blank_question/heart_update",
                        {
                            method : "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data)
                        })
                        .then(res => res.json())
                        .then(data => {
                            alert('아이템을 사용하셨습니다.');
                        gameLifeScore = 2;
                        let gameLifeId = ".gameLife" + (gameLifeScore+1);
                        let gameLifeDocument = document.querySelectorAll(gameLifeId);
                        for(var i = 0; i < gameLifeDocument.length; i++){
                            gameLifeDocument[i].innerText = "♥";
                        }
                        cnt--;
                        rightContinueButton(cnt, amount);
                        })
                        return;
                    }
                }
                alert("목숨이 끊겼습니다.");
                window.history.back();
                return;
            }
            userChooseValue="";
            sectionBefore.style.display = "none";
            sectionAfter.style.display = "flex";
            let userChooseAll = document.querySelectorAll(".userChoose");
            for(var i = 0; i < userChooseAll.length; i++){
                userChooseAll[i].style.backgroundColor = "white";
            }
            let chooseItems = document.querySelectorAll(".userChoose");
            for(var i = 0; i < chooseItems.length; i++){
                chooseItems[i].disabled = false;
            }
        }

    // X 나가기 Button
    const gameExit = () => {
        if (window.confirm("정말 그만두시겠습니까?")) {
            window.history.back();
        }
    }    