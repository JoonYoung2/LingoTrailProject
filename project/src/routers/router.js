module.exports = (app) => {
    const router = require("express").Router();
    const memberRouter = require("./member/memberRouter");
    const game1Router = require("./games/game01Router");
    const speakQuetionRouter = require("./games/speakQuestionRouter");
    
    app.get("/", (req, res) => {
        res.send("gdgd");
    })

    app.use("/member", memberRouter);
    app.use("/game1", game1Router);
    app.use("/speakQuestion", speakQuetionRouter);

    return router;
}