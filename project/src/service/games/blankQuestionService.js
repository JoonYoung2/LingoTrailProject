const dao = require("../../dao/games/blankQuestionDao");

const blankQuestion = {
    startGame : async (body, session) => {
        let language = body.language;
        let level = body.level;
        let partName = body.partName;
        let rownum = Number(body.questionNum) * 5;
        await dao.gameConfig.setUserConfig(language, level, partName, body.questionNum, session.userId);
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
        start = (start && start > 1)?Number(start):1; // Number == 문자열을 숫자로 변환
        const page = pageOperation(start, totalCounter);

        let getList = await dao.gameCrud.getList(page.startNum, page.endNum);

        data = {};
        data.start = start;
        data.list = getList;
        data.page = page;

        return data;
    },

    insert : async (body) => {
        await dao.gameCrud.insert(body);
        const msg = "등록 완료";
        const url = "/blank_question/list_form";
        return sendMessage(msg, url);
    },

    updateList : async (body) => {
        let id = body[0].id.split(',');
        let question = body[1].question.split(',');
        let answer = body[2].answer.split(',');
        let meaning = body[3].meaning.split(',');
        let language = body[4].language.split(',');
        let parts = body[5].parts.split(',');
        let level = body[6].level.split(',');
        await dao.gameCrud.updateList(id, question, answer, meaning, language, parts, level);
    },

    deleteList : async (body) => {
        await dao.gameCrud.deleteList(body);
    },

    getTotalContent : async () => {
        return await dao.gameCrud.getTotalContent();
    },
    
    getMaxId : async () => {
        return await dao.gameCrud.getMaxId();
    },

    getLanguage : async () => {
        return await dao.gameCrud.getLanguage();
    },

    getLevel : async () => {
        return await dao.gameCrud.getLevel();
    },

    getParts : async () => {
        return await dao.gameCrud.getParts();
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
        const msg = "등록 완료";
        const url = "/blank_question/language_form";
        return sendMessage(msg, url);
    },

    updateList : async (body) => {
        body.values = body[0].id;
        let id = body[0].id.split(',');
        let language = body[1].language.split(',');
        let languageNames = await dao.languageCrud.getLanguageNames(body);

        await dao.languageCrud.updateList(id, languageNames, language);
    },

    deleteList : async (body) => {
        let languageNames = await dao.languageCrud.getLanguageNames(body);
        await dao.languageCrud.deleteList(body, languageNames);
    }
}

const levelCrud = {
    insert : async () => {
        const highId = await dao.levelCrud.getHighId();
        await dao.levelCrud.insert(highId);
    },

    delete : async () => {
        const highId = await dao.levelCrud.getHighId();
        await dao.levelCrud.delete(highId);
    }
}

const partsCrud = {
    getMaxId : async () => {
        return await dao.partsCrud.getMaxId();
    },

    insert : async (body) => {
        await dao.partsCrud.insert(body);
        const msg = "등록 완료";
        const url = "/blank_question/parts_form";
        return sendMessage(msg, url);
    },

    updateList : async (body) => {
        let id = body[0].id.split(',');
        let partName = body[1].partName.split(',');
        await dao.partsCrud.updateList(id, partName);
    },

    deleteList : async (body) => {
        await dao.partsCrud.deleteList(body);
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
        let url = "/blank_question/word_form";
        return sendMessage(msg, url);
    },

    delete : async (body) => {
        await dao.wordCrud.delete(body);
    },

    
    update : async (body) => {
        let id = body[0].id.split(',');
        let partId = body[1].partId.split(',');
        let language = await dao.gameCrud.getLanguage();
        console.log(language);
        await dao.wordCrud.update(id, partId, body[2], language);
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

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, partsCrud, wordCrud};