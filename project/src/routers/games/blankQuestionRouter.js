const router = require("express").Router();
const controller = require("../../controller/games/blankQuestionController");

router.get("/step", controller.gameConfig.stepForm);

router.post("/blank_quetionStart.do", controller.blankQuestion.startGame);

router.get("/list_form", controller.gameCrud.getList);

router.get("/blank_insert_list", controller.gameCrud.insertGetList);

router.post("/blank_insert", controller.gameCrud.insert);

router.post("/blank_update", controller.gameCrud.updateList);

router.post("/blank_delete", controller.gameCrud.deleteList);

router.post("/blank_search_list", controller.gameCrud.search);

router.post("/heart_update", controller.gameCrud.heartUpdate);

router.post("/save_score", controller.gameCrud.saveScore);

router.get("/level_form", controller.levelCrud.getList);

router.get("/level_insert", controller.levelCrud.insert);

router.get("/level_delete", controller.levelCrud.delete);

router.get("/language_form", controller.languageCrud.getList);

router.get("/language_insert_list", controller.languageCrud.insertGetList);

router.post("/language_insert", controller.languageCrud.insert);

router.post("/language_update", controller.languageCrud.updateList);

router.post("/language_delete", controller.languageCrud.deleteList);

router.get("/parts_form", controller.partsCrud.getList);

router.get("/parts_insert_list", controller.partsCrud.insertGetList);

router.post("/parts_insert", controller.partsCrud.insert);

router.post("/parts_update", controller.partsCrud.updateList);

router.post("/parts_delete", controller.partsCrud.deleteList);

router.get("/word_form", controller.wordCrud.getList);

router.get("/word_insert_list", controller.wordCrud.getMaxId);

router.post("/word_insert", controller.wordCrud.insert);

router.post("/word_delete", controller.wordCrud.delete);

router.post("/word_update", controller.wordCrud.update);

router.post("/word_search_list", controller.wordCrud.search);


module.exports = router;