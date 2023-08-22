let pageSize = 0;
let selectedWord="";
let score=100;
let energyBar;
let answerItemValue = "";
let questionNum = 0;
let questionNums = 1;
let heartNum = 3;
let heartHad = 0;
let usedHeart = 0;
let rightAnswerCnt = 0;
let level = 0;
let pointByLevel=0;

window.onload = () => {
    energyBar = document.getElementById("energyBar");
    let scoreClass = document.querySelectorAll('.score');
    questionNum = document.getElementById("questionNum").value;
    heartHad = document.getElementById("heartDb").value;
    level = document.getElementById("level").value;
    if(level==1){
        pointByLevel=5;
    }else if(level==2){
        pointByLevel=10;
    }else if(level==3){
        pointByLevel=15;
    }else if(level==4){
        pointByLevel=20;
    }else if(level==5){
        pointByLevel=25;
    }
    let a = ' &#91 ';
    let b = ' &#93 ';
    scoreClass[0].innerHTML = "<span style='padding-left:480px;'>score : " + score + `</span><span style='padding-left:320px;'> <span style='color:black;'> ${a} </span>` + questionNums + " / " + questionNum + `</span><span style='color:black;'> ${b} </span><span style='color:red; padding-left:370px;'>♥</span>X` + heartNum + "";

    let mainPageClass = document.querySelectorAll(".mainPage");
    pageSize = mainPageClass.length;
    let mainPageId = "mainPage0";
    document.getElementById(mainPageId).style.display = "block";
    return;
}

const nextViewBtn = (cnt) => {
    if(cnt == pageSize-1){

        alert("모든 문제를 푸셨습니다. 점수는 "+score+"이며, 랭킹포인트는 "+(rightAnswerCnt*pointByLevel)+ "입니다.");
        console.log(rightAnswerCnt*pointByLevel);
        location.href="/meaning/result?score="+score + "&heart=" + heartNum + "&rankingPoint="+(rightAnswerCnt*pointByLevel) + "&usedHeart" + usedHeart;
        return;
    }

    function heartUsingCh(){
        if(!confirm("제공된 하트가 소진되었습니다. 보유한 하트를 사용하시겠습니까?")){
            alert("게임을 종료합니다.");
            window.history.back();
            return;
        }else{
            alert("지금부터 하트아이템이 소진됩니다.");
            usedHeart=1;
            heartNum=heartHad;
        }
    }


    if(heartNum <= 0){
        if(usedHeart==0 && heartHad>0){
            heartUsingCh();
        }else{
            
            alert("보유한 하트가 없습니다. 게임을 종료합니다.");
            location.href="/meaning/result?score=0&heart=0&rankingPoint=0";
            return;
        }
    }
    answerItemValue = "";
    console.log(cnt);
    
    questionNums++;
    
    let count = Number(cnt);
    let mainPagePreId = "mainPage" + count;
    let mainPageNextId = "mainPage" + (count+1);

    document.getElementById(mainPagePreId).style.display = "none";
    document.getElementById(mainPageNextId).style.display = "block";

    let answerItemsAll = document.querySelectorAll(".answerItems");
    
    for(var i = 0; i < answerItemsAll.length; i++){
        answerItemsAll[i].disabled = false;
    }
    let scoreClass = document.querySelectorAll('.score');
    let a = ' &#91 ';
    let b = ' &#93 ';
    scoreClass[0].innerHTML = "<span style='padding-left:480px;'>score : " + score + `</span><span style='padding-left:320px;'> <span style='color:black;'> ${a} </span>` + questionNums + " / " + questionNum + `</span><span style='color:black;'> ${b} </span><span style='color:red; padding-left:370px;'>♥</span>X` + heartNum + "";
    return;
}

const answerBtnClick = (word, cnt)=>{
    let answerItemsAll = document.querySelectorAll(".answerItems");
    for(var i = 0; i < answerItemsAll.length; i++){
        answerItemsAll[i].style.backgroundColor = "white";
    }
    let answerItemsClass = "answerItems" + cnt;
    let answerItems = document.querySelector("." + answerItemsClass);
    answerItems.style.backgroundColor =  "rgb(29, 131, 249)";
    answerItemValue = word;
    selectedWord=word;  
    //selectedWord bold 처리하기
}

const marking = (answer, cnt, QeAn)=>{
    console.log("수아 바보 ==> ",heartHad);
    //let cnt=0;
    console.log("answer ==> ",answerItemValue);
    if(answerItemValue == ""){
        return;
    }
    let idForMarking="marking"+cnt;
    let idForNext="next"+cnt;
    document.getElementById(idForMarking).style.display = "none";
    document.getElementById(idForNext).style.display = "block";
    
    let markingResult = document.querySelectorAll('.markingResult');//querySelectorAll하면 배열로 들어간다.
    let scoreClass = document.querySelectorAll('.score');
    let answerItemsAll = document.querySelectorAll(".answerItems");
    for(var i = 0; i < answerItemsAll.length; i++){
        answerItemsAll[i].disabled = true;
    }

    if(selectedWord==answer){
        console.log("true");
        markingResult[Number(cnt)].innerText = "Excellent!!";
        rightAnswerCnt++;
        if(questionNums>questionNum){
            questionNums=questionNum
        }
        let a = ' &#91 ';
    let b = ' &#93 ';
    scoreClass[0].innerHTML = "<span style='padding-left:480px;'>score : " + score + `</span><span style='padding-left:320px;'> <span style='color:black;'> ${a} </span>` + questionNums + " / " + questionNum + `</span><span style='color:black;'> ${b} </span><span style='color:red; padding-left:370px;'>♥</span>X` + heartNum + "";
        
    }else{
        heartNum--;
        console.log("false");
        score-=100/QeAn;
        markingResult[Number(cnt)].innerHTML = "<div style='text-align:center;'>Wrong!!!!!<br><br> Right answer : <span style='color:red'>"+ answer + "</span></div>";
        if(questionNums>questionNum){
            questionNums=questionNum
        }
        let a = ' &#91 ';
    let b = ' &#93 ';
    scoreClass[0].innerHTML = "<span style='padding-left:480px;'>score : " + score + `</span><span style='padding-left:320px;'> <span style='color:black;'> ${a} </span>` + questionNums + " / " + questionNum + `</span><span style='color:black;'> ${b} </span><span style='color:red; padding-left:370px;'>♥</span>X` + heartNum + "";
        
        
        for(var i = 0; i < QeAn; i++){
            energyBar.style.width = `${score}%`;
        }
    }
    //cnt++;
}