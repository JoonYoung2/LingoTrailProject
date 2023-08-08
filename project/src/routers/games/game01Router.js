const router = require("express").Router();

const gameCtrl = require("../../controller/games/game1Controller");

router.get("/", gameCtrl.views.index);
router.get("/list", gameCtrl.views.list);

module.exports = router;