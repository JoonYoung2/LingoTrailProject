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

module.exports = {speakQuestion, gameConfig};