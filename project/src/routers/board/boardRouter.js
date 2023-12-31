const router = require("express").Router();
const boardCtrl = require("../../controller/board/boardController");


router.get("/", boardCtrl.views.list);
router.get("/detail/:id", boardCtrl.views.detail);
router.get("/writeForm", boardCtrl.views.writeForm);
router.get("/detail/:id/modify_form", boardCtrl.views.modifyForm);


router.post("/submit", boardCtrl.process.submit);
router.post("/modify", boardCtrl.process.modify);
router.post("/delete", boardCtrl.process.remove);

// 댓글
router.post("/addComment/:id", boardCtrl.commentProcess.submit);
router.get("/deleteComment/:commentId/:boardId", boardCtrl.commentProcess.remove);


module.exports = router;