const service = require("../../service/games/speakQuestionService");

const speakQuestion = {
    startGame : async (req, res) => {
        let data = await service.speakQuestion.startGame(req.body, req.session);
        let word = await service.speakQuestion.getWord(data.rows, req.body.answerLang);
        let language = await service.speakQuestion.getLanguage(req.body.answerLang);
        let languageCheck = 0;
        if(req.body.answerLang == req.body.language){
            languageCheck = 1; // question과 answer이 같으면
        }
        res.render("games/speak/question_index", {data : data.rows, word, content : req.body.contentState, languageCheck, language});
    }
}

const gameConfig = {
    stepForm : async (req, res) => {
        let config = await service.gameConfig.getConfig(req.session);
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        res.render("games/speak/step", {level : level.rows, language : language.rows, config : config[0]});
    }
}

const gameCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.gameCrud.getTotalContent();
        const start = req.query.start;
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let data = await service.gameCrud.getList(start, totalCounter);
        console.log("contorller getList data ==> ", data);
        if(data.list[0] === undefined){
            data.list = undefined;
            res.render("admin/games/speak/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page});
        }else{
            res.render("admin/games/speak/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page});
        }
    },

    deleteList : async (req, res) => {
        service.gameCrud.deleteList(req.body);
        res.json(1);
    },

    updateList : async (req, res) => {
        service.gameCrud.updateList(req.body);
        res.json(1);
    },

    insert : async (req, res) => {
        let msg = await service.gameCrud.insert(req.body);
        console.log(msg);
        res.send(msg);
    },

    insertGetList : async (req, res) => {
        let maxId = await service.gameCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        res.json({maxId, language, level});
    },

    search : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let data = await service.gameCrud.search(req.body);
        if(data[0] === undefined){
            res.json({data : undefined, input : req.body});
        }else{
            res.json({language, level, data, input : req.body})
        }
    }
}

const languageCrud = {
    getList : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        res.render("admin/games/speak/language_form", {language});
    },

    getMaxId : async (req, res) => {
        let maxId = await service.languageCrud.getMaxId();
        res.json({maxId})
    },

    insert : async (req, res) => {
        await service.languageCrud.insert(req.body);
        res.redirect("/speak_question/language_form");
    },

    delete : async (req, res) => {
        await service.languageCrud.delete(req.body);
        res.json(1);
    },

    update : async (req, res) => {
        await service.languageCrud.update(req.body);
        res.json(1);
    }
}

const levelCrud = {
    getList : async (req, res) => {
        let level = await service.gameCrud.getLevel();
        res.render("admin/games/speak/level_form", {level});
    },

    insert : async (req, res) => {
        await service.levelCrud.insert();
        res.json(1);
    },

    delete : async (req, res) => {
        await service.levelCrud.delete();
        res.json(1);
    }
}

const wordCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.wordCrud.getTotalContent();
        const start = req.query.start;
        let language = await service.gameCrud.getLanguage();
        let word = await service.wordCrud.getWordList(start, totalCounter);

        console.log(language);
        console.log(word);

        res.render("admin/games/speak/word_form", {language, word : word.list, start : word.start, page : word.page});
    },

    getMaxId : async (req, res) => {
        let maxId = await service.wordCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        res.json({maxId, language});
    },

    insert : async (req, res) => {
        let msg = await service.wordCrud.insert(req.body);
        res.send(msg);
    },

    delete : async (req, res) => {
        await service.wordCrud.delete(req.body);
        res.json(1);
    },

    update : async (req, res) => {
        console.log("body ==> ", req.body);
        await service.wordCrud.update(req.body);
        res.json(1);
    },

    search : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        let data = await service.wordCrud.search(req.body, language);
        if(data[0] === undefined){
            res.json({language, data : undefined, input : req.body});
        }else{
            res.json({language, data, input : req.body})
        }
    }
}

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};