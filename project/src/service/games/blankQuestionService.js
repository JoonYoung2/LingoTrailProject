const dao = require("../../dao/games/blankQuestionDao");

const blankQuestion = {
    startGame : async (body) => {
        let language = body.language;
        let level = body.level;
        let partName = body.partName;
        let rownum = Number(body.questionNum) * 5;
        return await dao.blankQuestion.startGame(language, level, partName, rownum);
    },

    getWord : async (data, body) => {
        let partName = body.partName;
        let language = body.language;
        let getLanguageName = await dao.blankQuestion.getLanguageName(language);
        let word = await dao.blankQuestion.getWord(getLanguageName, partName);
        let rownum = body.questionNum * 5;
        let tmp = "";
        let answer = [""];
        for(var i = 0; i < rownum; i++){
            tmp += data[i].ANSWER + " "; //문제 정답
            for(var j = 0; j < 4; j++){
                let num = Math.floor(Math.random() * 72);
                tmp += word[num][getLanguageName[0].LANGUAGE] + " ";
            }
            answer[i] = tmp;
            tmp = "";
        }
        console.log("tmp ==> ",tmp);
        return answer;
    }
}

const gameConfig = {
    getLevel : async () => {
        return await dao.gameConfig.getLevel();
    },

    getLanguage : async () => {
        return await dao.gameConfig.getLanguage();
    },

    getPartName : async () => {
        return await dao.gameConfig.getPartName();
    },

    getUserConfig : async (session) => {
        return await dao.gameConfig.getUserConfig(session);
    }
}

const gameCrud = {
    getList : async (start, totalCounter) => {
        
    }
}

const languageCrud = {
    getMaxId : async () => {
        
    }
}

const levelCrud = {
    insert : async () => {
        
    }
}

const wordCrud = {
    getWordList : async (start, totalCounter) => {
        
    }
}

const pageOperation = (start, totalCounter) => {
    let page = {};
    const pageNum = 10;
    const num = (totalCounter % pageNum === 0)?0:1;
    page.totPage = parseInt( totalCounter / pageNum ) + num;
    page.startNum = (start-1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}

const sendMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href='${url}';
            </script>`
}

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};