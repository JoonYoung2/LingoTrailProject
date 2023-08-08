module.exports = (app) => {
    const router = require("express").Router();
    const memberRouter = require("./member/memberRouter");
    const game1Router = require("./games/game01Router");
    
    app.get("/", (req, res) => {
        res.render("index");
    })

    app.use("/member", memberRouter);
    app.use("/game1", game1Router);

    return router;
}