const controller = require("../../controller/games/meaningController");
const router = require("express").Router();

router.get("/",(req, res) =>{
    res.send(`<a href = "/meaning/condition">Start Game</a>`);
})

router.get("/condition", controller.configure.condition);
router.post("/showGames", controller.configure.showGames);
router.get("/listForm", controller.meaningCrud.getList);
router.get("/result", controller.configure.result);


module.exports = router;