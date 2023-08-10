const controller = require("../../controller/games/meaningController");
const router = require("express").Router();

router.get("/",(req, res) =>{
    res.send(`<a href = "/meaning/condition">Start Game</a>`);
})

router.get("/condition", controller.configure.condition);
router.post("/condition.do", controller.configure.conditionDo);


module.exports = router;