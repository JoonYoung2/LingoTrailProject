const router = require("express").Router();
const controller = require("../../controller/games/blankQuestionController");

router.get("/step", controller.gameConfig.stepForm);

router.post("/blank_quetionStart.do", controller.blankQuestion.startGame);

module.exports = router;