module.exports = (app) => {
    const router = require("express").Router();
    const memberRouter = require("./member/memberRouter");
    const game1Router = require("./games/game01Router");
    const speakQuetionRouter = require("./games/speakQuestionRouter");
    const meaningRouter = require("./games/meaningRouter");
    const blankQuestionRouter = require("./games/blankQuestionRouter");
    const rankingRouter = require("./ranking/rankingRouter");
    const boardRouter = require("./board/boardRouter");
    const questRouter = require("./quest/questRouter");
    
    app.get("/", (req, res) => {
        res.render("index", { userId : req.session.userId });
    })
    /* 
    TODO: session 으로 admin 검증합시다
    이곳의 버튼에서 각자의 경로로 이동한 뒤 url 접근 막도록 합니다
     */
    app.get("/admin", (req, res) => {
        if(req.session.loginType == undefined){
            res.redirect("/member");
        }else if(!req.session.loginType == 1){
            res.redirect("/member");
        }else{
            res.render("admin/index");
        }
    })

    app.use("/member", memberRouter);
    app.use("/game1", game1Router);
    app.use("/speak_question", speakQuetionRouter);
    app.use("/meaning", meaningRouter);
    app.use("/blank_question", blankQuestionRouter);
    app.use("/ranking", rankingRouter);
    app.use("/board", boardRouter);
    app.use("/quest", questRouter);
    return router;
}