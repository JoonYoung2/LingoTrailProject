const router = require("express").Router();

const controller = require("../../controller/games/speakQuestionController");

router.get("/step", controller.gameConfig.stepForm);

router.post("/speakQuetionStart.do", controller.speakQuestion.startGame);

module.exports = router;