const router = require("express").Router();

const rankingCtrl = require("../../controller/ranking/rankingController");

router.get("/list", rankingCtrl.views.list); // level 없이
router.get("/score", rankingCtrl.views.score);
router.get("/game01", rankingCtrl.views.game01);
router.get("/game02", rankingCtrl.views.game02);
router.get("/game03", rankingCtrl.views.game03);
router.get("/total", rankingCtrl.views.total);

module.exports = router;