const dao = require("../../dao/games/speakQuestionDao");

const speakQuestion = {
    startGame : async (body, session) => {
        let data = await dao.speakQuestion.startGame(body, session);

        return data;
    },

    getWord : async (data, answerLang, questionNum, answerNum) => {
        let result = await dao.speakQuestion.getWord();
        let word = [{}];
        if(questionNum == answerNum){
            for(var i = 0; i < data.length; i++){
                let answer = data[i].QUESTION; 
                for(var j = 0; j < 3; j++){
                    let randomNum = Math.floor(Math.random() * result.length);
                    answer += " " + result[randomNum][answerLang.LANGUAGE];
                    console.log("answer ====> ",answer);
                }
                console.log(answer);
                word[i] = {random : answer};
            }
        }else{
            for(var i = 0; i < data.length; i++){
                let answer = data[i].ANSWER; 
                for(var j = 0; j < 3; j++){
                    let randomNum = Math.floor(Math.random() * result.length);
                    answer += " " + result[randomNum][answerLang.LANGUAGE];
                    console.log("answer ====> ",answer);
                }
                console.log(answer);
                word[i] = {random : answer};
            }
        }
        

        console.log("service getWord word ==> ", word);

        return word;
    },

    getLanguage : async (language) => {
        return await dao.speakQuestion.getLanguage(language);
    },

    getHeart : async (session) => {
        return await dao.speakQuestion.getHeart(session);
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
        let qlanguage = body[3].qlanguage.split(',');
        let alanguage = body[4].alanguage.split(',');
        let level = body[5].level.split(',');

        await dao.gameCrud.updateList(id, question, answer, qlanguage, alanguage, level);
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
    },

    heartUpdate : async (body, session) => {
        await dao.gameCrud.heartUpdate(body, session);
    },

    saveScore : async (body, session) => {
        await dao.gameCrud.saveScore(body, session);
    },

    saveHeartScore : async (body, session) => {
        await dao.gameCrud.saveHeartScore(body, session);
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
        let languageNames = await dao.languageCrud.getLanguageNames(body);
        await dao.languageCrud.delete(body, languageNames);
    },

    update : async (body) => {
        body.values = body[0].id;
        let languageNames = await dao.languageCrud.getLanguageNames(body);
        let id = body[0].id.split(',');
        let language = body[1].language.split(',');
        
        await dao.languageCrud.update(id, language, languageNames);
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

const wordCrud = {
    getWordList : async (start, totalCounter) => {
        start = (start && start > 1)?Number(start):1; // Number == 문자열을 숫자로 변환
        const page = pageOperation(start, totalCounter);

        let getList = await dao.wordCrud.getWordList(page.startNum, page.endNum);

        data = {};
        data.start = start;
        data.list = getList;
        data.page = page;

        return data;
    },

    getTotalContent : async () => {
        return await dao.wordCrud.getTotalContent();
    },

    getMaxId : async () => {
        return await dao.wordCrud.getMaxId();
    },

    insert : async (body) => {
        let language = await dao.gameCrud.getLanguage();
        await dao.wordCrud.insert(body, language);
        let msg = "등록 완료";
        let url = "/speak_question/word_form";
        return sendMessage(msg, url);
    },

    delete : async (body) => {
        await dao.wordCrud.delete(body);
    },

    
    update : async (body) => {
        let id = body[0].id.split(',');
        let language = await dao.gameCrud.getLanguage();
        console.log(language);
        await dao.wordCrud.update(id, body[1], language);
    },

    search : async (body, language) => {
        let data = await dao.wordCrud.search(body, language);
        return data;
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

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};