const service = require("../../service/games/speakQuestionService");

const speakQuestion = {
    startGame : async (req, res) => {
        let data = await service.speakQuestion.startGame(req.body);
        let word = await service.speakQuestion.getWord(data.rows);
        res.render("games/speak/question_index", {data : data.rows, word});
    }
}

const gameConfig = {
    stepForm : async (req, res) => {   
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        res.render("games/speak/step", {level : level.rows, language : language.rows});
    }
}

const gameCrud = {
    getList : async (req, res) => {
        let data = await service.gameCrud.getList();
        console.log("contorller getList data ==> ", data);
        if(data[0] === undefined){
            data = undefined;
            res.render("admin/games/speak/list", {data});
        }else{
            res.render("admin/games/speak/list", {data});
        }
    },

    deleteList : async (req, res) => {
        service.gameCrud.deleteList(req.body);
        res.json(1);
    }
}

module.exports = {speakQuestion, gameConfig, gameCrud};