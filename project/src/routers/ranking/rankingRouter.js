const router = require("express").Router();

const rankingCtrl = require("../../controller/ranking/rankingController");

router.get("/list", rankingCtrl.views.list); // level 없이
router.get("/score", rankingCtrl.views.score);
router.get("/meaning_game", rankingCtrl.views.meaning_game);
router.get("/photo_game", rankingCtrl.views.photo_game);
router.get("/blank_game", rankingCtrl.views.blank_game);
router.get("/listening_game", rankingCtrl.views.listening_game);
router.get("/total", rankingCtrl.views.total);

module.exports = router;