const service = require("../../service/games/blankQuestionService");

const blankQuestion = {
    startGame : async (req, res) => {
        
    }
}

const gameConfig = {
    stepForm : async (req, res) => {
        res.render("games/blank/step");
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