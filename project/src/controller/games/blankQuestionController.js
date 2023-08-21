const service = require("../../service/games/blankQuestionService");

const blankQuestion = {
    startGame : async (req, res) => {
        let data = await service.blankQuestion.startGame(req.body, req.session);
        let words = await service.blankQuestion.getWord(data, req.body);
        let amount = req.body.questionNum * 5;
        let heart = await service.blankQuestion.getHeart(req.session);
        let level = req.body.level;
    
        res.render("games/blank/question_index", {data, words, amount, heart, level});
    }
}

const gameConfig = {
    stepForm : async (req, res) => {
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        let partName = await service.gameConfig.getPartName();
        let config = await service.gameConfig.getUserConfig(req.session);
        console.log("config ==> ",config);
        res.render("games/blank/step", {level, language, partName, userId : req.session.userId, config : config});
    }
}

const gameCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.gameCrud.getTotalContent();
        const start = req.query.start;
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        let partName = await service.gameConfig.getPartName();
        let data = await service.gameCrud.getList(start, totalCounter);
        if(data.list[0] === undefined){
            data.list = undefined;
            res.render("admin/games/blank/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page, parts : partName});
        }else{
            res.render("admin/games/blank/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page, parts : partName});
        }
    },

    insertGetList : async (req, res) => {
        let maxId = await service.gameCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let parts = await service.gameCrud.getParts();
        res.json({maxId, language, level, parts});
    },

    insert : async (req, res) => {
        let msg = await service.gameCrud.insert(req.body);
        res.send(msg);
    },

    updateList : async (req, res) => {
        await service.gameCrud.updateList(req.body);
        res.json(1);
    },

    deleteList : async (req, res) => {
        await service.gameCrud.deleteList(req.body);
        res.json(1);
    },

    search : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let parts = await service.gameCrud.getParts();
        let data = await service.gameCrud.search(req.body);
        console.log("data", data);
        console.log("language ==> ", language);
        console.log("level ==> ", level);
        if(data[0] === undefined){
            res.json({data : undefined, input : req.body});
        }else{
            res.json({language, level, data, input : req.body, parts})
        }
    },

    heartUpdate : async (req, res) => {
        await service.gameCrud.heartUpdate(req.body, req.session);
        res.json(1);
    },

    saveScore : async (req, res) => {
        await service.gameCrud.saveScore(req.body, req.session);
        res.json(1);
    }
}

const languageCrud = {
    getList : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        res.render("admin/games/blank/language_form", {language});
    },

    insertGetList : async (req, res) => {
        let maxId = await service.languageCrud.getMaxId();
        res.json({maxId});
    },

    insert : async (req, res) => {
        let msg = await service.languageCrud.insert(req.body);
        res.send(msg);
    },

    updateList : async (req, res) => {
        await service.languageCrud.updateList(req.body);
        res.json(1);
    },

    deleteList : async (req, res) => {
        await service.languageCrud.deleteList(req.body);
        res.json(1);
    }
}

const levelCrud = {
    getList : async (req, res) => {
        let level = await service.gameConfig.getLevel();
        res.render("admin/games/blank/level_form", {level});
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

const partsCrud = {
    getList : async (req, res) => {
        let partName = await service.gameConfig.getPartName();
        res.render("admin/games/blank/parts_form", {partName});
    },

    insertGetList : async (req, res) => {
        let maxId = await service.partsCrud.getMaxId();
        res.json({maxId});
    },

    insert : async (req, res) => {
        let msg = await service.partsCrud.insert(req.body);
        res.send(msg);
    },

    updateList : async (req, res) => {
        await service.partsCrud.updateList(req.body);
        res.json(1);
    },

    deleteList : async (req, res) => {
        await service.partsCrud.deleteList(req.body);
        res.json(1);
    }
}

const wordCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.wordCrud.getTotalContent();
        const start = req.query.start;
        let parts = await service.gameCrud.getParts();
        let language = await service.gameCrud.getLanguage();
        let word = await service.wordCrud.getWordList(start, totalCounter);

        console.log(language);
        console.log(word);

        res.render("admin/games/blank/word_form", {language, word : word.list, start : word.start, page : word.page, parts});
    },

    getMaxId : async (req, res) => {
        let maxId = await service.wordCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        let parts = await service.gameCrud.getParts();
        res.json({maxId, language, parts});
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
        console.log("gdgd");
        let language = await service.gameCrud.getLanguage();
        let parts = await service.gameCrud.getParts();
        let data = await service.wordCrud.search(req.body, language);
        if(data[0] === undefined){
            res.json({language, data : undefined, input : req.body});
        }else{
            res.json({language, data, input : req.body, parts})
        }
    }
}

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, partsCrud, wordCrud};