const router = require("express").Router();

const controller = require("../../controller/games/speakQuestionController");

router.get("/list_form", controller.gameCrud.getList);

router.get("/step", controller.gameConfig.stepForm);

router.post("/speak_quetionStart.do", controller.speakQuestion.startGame);

router.post("/speak_delete", controller.gameCrud.deleteList);

module.exports = router;