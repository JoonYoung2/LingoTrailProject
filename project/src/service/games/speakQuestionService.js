const dao = require("../../dao/games/speakQuestionDao");

const speakQuestion = {
    startGame : async (body, session) => {
        let data = await dao.speakQuestion.startGame(body, session);

        return data;
    },

    getWord : async (data, answerLang) => {
        let result = await dao.speakQuestion.getWord();
        let word = [{}];
        console.log(result);
        
        for(var i = 0; i < data.length; i++){
            if(data[i].LANGUAGE == 1){
                // speak == 한글 answer == 영어
                if(data[i].LANGUAGE != answerLang){
                    let answer = data[i].ANSWER; 
                    for(var j = 0; j < 3; j++){
                        let randomNum = Math.floor(Math.random() * 100);
                        console.log(randomNum);
                        answer += " " + result[randomNum].ENG;
                    }
                    console.log(answer);
                    word[i] = {random : answer};
                // speak == 한글 answer == 한글
                }else{
                    let answer = data[i].QUESTION; 
                    for(var j = 0; j < 3; j++){
                        let randomNum = Math.floor(Math.random() * 100);
                        console.log(randomNum);
                        answer += " " + result[randomNum].KOR;
                    }
                    console.log(answer);
                    word[i] = {random : answer};
                }
            }else{
                // speak == 영어 answer == 한글
                if(data[i].LANGUAGE != answerLang){
                    let answer = data[i].ANSWER;
                    for(var j = 0; j < 3; j++){
                        let randomNum = Math.floor(Math.random() * 100);
                        console.log(randomNum);
                        answer += " " + result[randomNum].KOR;
                    }
                    console.log(answer);
                    word[i] = {random : answer};
                // speak == 영어 answer == 영어
                }else{
                    let answer = data[i].QUESTION;
                    for(var j = 0; j < 3; j++){
                        let randomNum = Math.floor(Math.random() * 100);
                        console.log(randomNum);
                        answer += " " + result[randomNum].ENG;
                    }
                    console.log(answer);
                    word[i] = {random : answer};
                }
            }
        }

        console.log("service getWord word ==> ", word);

        return word;
    }
}

const gameConfig = {
    getLevel : async () => {
        let getLevel = await dao.gameConfig.getLevel();

        return getLevel;
    },

    getLanguage : async () => {
        let getLanguage = await dao.gameConfig.getLanguage();

        return getLanguage;
    },

    getConfig : async (session) => {
        return await dao.gameConfig.getConfig(session);
    }
}

const gameCrud = {
    getList : async (start, totalCounter) => {
        start = (start && start > 1)?Number(start):1; // Number == 문자열을 숫자로 변환
        const page = pageOperation(start, totalCounter);

        let getList = await dao.gameCrud.getList(page.startNum, page.endNum);

        data = {};
        data.start = start;
        data.list = getList;
        data.page = page;

        return data;
    },

    getLanguage : async () => {
        let language = await dao.gameCrud.getLanguage();

        return language;
    },

    getLevel : async () => {
        let level = await dao.gameCrud.getLevel();

        return level;
    },

    deleteList : async (body) => {
        await dao.gameCrud.deleteList(body);
    },

    updateList : async (body) => {
        let id = body[0].id.split(',');
        let question = body[1].question.split(',');
        let answer = body[2].answer.split(',');
        let language = body[3].language.split(',');
        let level = body[4].level.split(',');

        await dao.gameCrud.updateList(id, question, answer, language, level);
    },

    getTotalContent : async () => {
        const totalContent = await dao.gameCrud.getTotalContent();
        return totalContent;
    },

    getMaxId : async () => {
        return await dao.gameCrud.getMaxId();
    },

    insert : async (body) => {
        await dao.gameCrud.insert(body);
        let msg = "등록 완료.";
        let url = "/speak_question/list_form";
        return sendMessage(msg, url);
    },
    
    search : async (body) => {
        let data = await dao.gameCrud.search(body);
        console.log("search data ==> ", data);
        return data;
    }
}

const languageCrud = {
    getMaxId : async () => {
        return await dao.languageCrud.getMaxId();
    },

    insert : async (body) => {
        await dao.languageCrud.insert(body);
    },

    delete : async (body) => {
        await dao.languageCrud.delete(body);
    },

    update : async (body) => {
        let id = body[0].id.split(',');
        let language = body[1].language.split(',');
        await dao.languageCrud.update(id, language);
    }
}

const levelCrud = {
    insert : async () => {
        let maxId = await dao.levelCrud.getMaxId();
        await dao.levelCrud.insert(maxId);
    },

    delete : async () => {
        let highId = await dao.levelCrud.getHighId();
        await dao.levelCrud.delete(highId);
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

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud};