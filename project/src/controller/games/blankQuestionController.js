const service = require("../../service/games/blankQuestionService");

const blankQuestion = {
    startGame : async (req, res) => {
        let data = await service.blankQuestion.startGame(req.body);
        let words = await service.blankQuestion.getWord(data, req.body);
        let amount = req.body.questionNum * 5;
    
        res.render("games/blank/question_index", {data, words, amount});
    }
}

const gameConfig = {
    stepForm : async (req, res) => {
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        let partName = await service.gameConfig.getPartName();
        let config = await service.gameConfig.getUserConfig(req.session);
        res.render("games/blank/step", {level, language, partName});
    }
}

const gameCrud = {
    getList : async (req, res) => {
        
    }
}

const languageCrud = {
    getList : async (req, res) => {
        
    }
}

const levelCrud = {
    getList : async (req, res) => {
        
    }
}

const wordCrud = {
    getList : async (req, res) => {
        
    }
}

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};