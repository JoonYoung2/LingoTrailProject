const { SYSASM } = require("oracledb");
const dao = require("../../dao/games/meaningDao");
const configure = {
    getQeAn : async (body)=>{ //{ level: '1' }
        let result = await dao.configure.getQeAn(body.level_step);
        return result;
    },

    getGiven : async (body, qna)=>{
        let getSelectors;
        
        let answerLanguageSet = await dao.configure.getLanguageSet(body.answerLanguage);
        if(body.answerLanguage == "1"){
            getSelectors = await dao.configure.getGivenKor(body.level_step);
        }else if(body.answerLanguage == "2"){
            getSelectors = await dao.configure.getGivenEng(body.level_step);
        }

        function gettingMixedSelectors(i){////내가 하루종일 만든 함수임
        let result = [];
            let j = 0;
            
            result.push(qna[i][answerLanguageSet]);
            while(j<4){
                let n =Math.floor(Math.random() * getSelectors.length);
                let selectedWord = getSelectors[n][answerLanguageSet];
                if(! sameWord(selectedWord)){
                    result.push(selectedWord);
                    j++;
                }
            }
            function sameWord(selectedWord){
                return result.find((e) => (e === selectedWord));
            }
            return result;
        }

        function shuffleSelectors(array){
            const randomIndex = Math.floor(Math.random() * array.length);
            const answer = array[0];
            array[0] = array[randomIndex];
            array[randomIndex] = answer;

            return array;
        }

        let SelectorsWithAnswer=[];
        let shuffledSelectors=[];
        for(let i=0; i<qna.length; i++){ //문제 개수만큼 for문 동작.
            SelectorsWithAnswer[i]=gettingMixedSelectors(i);
            shuffledSelectors[i] = shuffleSelectors(SelectorsWithAnswer[i]);
        }
        return shuffledSelectors;
    },

    getLanguage : async () => {
        return await dao.configure.getLanguage();
    },

    getLevel : async () =>{
        return await dao.configure.getLevel();
    },

    getQuestion : async (body) => {
        let questionLanguageSet = await dao.configure.getLanguageSet(body.questionLanguage);

        return questionLanguageSet;
    },

    getAnswer : async (body) => {
        let answerLanguageSet = await dao.configure.getLanguageSet(body.answerLanguage);
        
        return answerLanguageSet;
    },
    getHeart : async (session) =>{
        let heart = await dao.configure.getHeart(session);
        return heart;
    },
    setHeart : async (heart, session)=>{
        await dao.configure.setHeart(heart, session);
    },
    setScore : async (rankingPoint, id)=>{
        await dao.configure.setScore(rankingPoint, id);
    }
}
const meaningCrud = {
    getAllforAdmin : async () => {
        let info = await dao.meaningCrud.getAllforAdmin();
        return info;
    },
    deleteList : async (body)=>{
        console.log("body ==> ",body);
        await dao.meaningCrud.deleteList(body);
    },
    updateList : async (body)=>{
        let id = body[0].id.split(',');
        let level = body[1].level.split(',');
        let korean = body[2].koreanLang.split(',');
        let english = body[3].englishLang.split(',');

        console.log(id);
        console.log(level);
        console.log(korean);
        console.log(english);

        await dao.meaningCrud.updateList(id, level, korean, english);
    },
    totalContent : async () =>{
        const totalContent = await dao.meaningCrud.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
    },

    list : async (start, totalCounter) => {
        start = (start && start > 1)?Number(start):1; // Number == 문자열을 숫자로 변환
        
        const page = pageOperation(start, totalCounter);
        console.log("safsdfasfd => ", page.totPage);
        console.log("safsdfasfd => ", page.startNum);
        console.log("safsdfasfd => ", page.endNum);
        // if(start && start > 1){
        //     start = Number(start);
        // }else{
        //     start = 1;
        // }
        const list = await dao.meaningCrud.list(page.startNum, page.endNum);
        console.log("service : ", list);

        data = {};
        data.start = start;
        data.list = list.rows;
        data.page = page;

        console.log("data : ", data);

        return data;
    }

}
const pageOperation = (start, totalCounter) => {
    let page = {};
    const pageNum = 15;
    const num = (totalCounter % pageNum === 0)?0:1;
    page.totPage = parseInt( totalCounter / pageNum ) + num;
    page.startNum = (start-1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}
module.exports = {configure, meaningCrud};