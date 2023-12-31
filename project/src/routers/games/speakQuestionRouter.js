const router = require("express").Router();

const controller = require("../../controller/games/speakQuestionController");


router.get("/step", controller.gameConfig.stepForm);

router.post("/speak_quetionStart.do", controller.speakQuestion.startGame);

router.get("/list_form", controller.gameCrud.getList);

router.post("/speak_delete", controller.gameCrud.deleteList);

router.post("/speak_update", controller.gameCrud.updateList);

router.get("/speak_insert_list", controller.gameCrud.insertGetList);

router.post("/speak_insert", controller.gameCrud.insert);

router.post("/speak_search_list", controller.gameCrud.search);

router.post("/heart_update", controller.gameCrud.heartUpdate);

router.post("/heart_score_update", controller.gameCrud.heartScoreUpdate);

router.post("/save_score", controller.gameCrud.saveScore);

router.get("/language_form", controller.languageCrud.getList);

router.get("/language_insert_list", controller.languageCrud.getMaxId);

router.post("/language_insert", controller.languageCrud.insert);

router.post("/language_delete", controller.languageCrud.delete);

router.post("/language_update", controller.languageCrud.update);

router.get("/level_form", controller.levelCrud.getList);

router.get("/level_insert", controller.levelCrud.insert);

router.get("/level_delete", controller.levelCrud.delete);

router.get("/word_form", controller.wordCrud.getList);

router.get("/word_insert_list", controller.wordCrud.getMaxId);

router.post("/word_insert", controller.wordCrud.insert);

router.post("/word_delete", controller.wordCrud.delete);

router.post("/word_update", controller.wordCrud.update);

router.post("/word_search_list", controller.wordCrud.search);

module.exports = router;