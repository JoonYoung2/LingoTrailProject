module.exports = (app) => {
    const router = require("express").Router();
    const memberRouter = require("./member/router");
    
    app.get("/", (req, res) => {
        res.send("gdgd");
    })

    app.use("/member", memberRouter);

    return router;
}