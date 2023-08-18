const controller = require("../../controller/games/meaningController");
const router = require("express").Router();

router.get("/",(req, res) =>{
    res.send(`<a href = "/meaning/condition">Start Game</a>`);
})

router.get("/condition", controller.configure.condition);
router.post("/showGames", controller.configure.showGames);
router.get("/listForm", controller.meaningCrud.getList);
router.post("/listForm", controller.meaningCrud.postList);
router.get("/result", controller.configure.result);
router.post("/meaning_delete", controller.meaningCrud.deleteList);
router.post("/meaning_update", controller.meaningCrud.updateList);

module.exports = router;