const router = require("express").Router();
const controller = require("../../controller/member/memberController");

router.get("/register", controller.member.register);
router.post("/register.do", controller.member.registerDo);

router.get("/login", controller.member.login);
router.post("/login.do", controller.member.loginDo);

router.get("/logout", controller.member.logout);
router.get("/logout.do", controller.member.logoutDo);

router.get("/info", controller.member.info);

router.get("/pwCheck", controller.member.pwCheck);
router.post("/pwCheck.do", controller.member.pwCheckDo);

router.get("/update", controller.member.update);
router.post("/update.do", controller.member.updateDo);

router.get("/unregister", controller.member.unregister);
router.post("/unregister.do", controller.member.unregisterDo);

router.get("/memberlist", controller.member.memberlist);

router.get("/modify/:id/:login_type", controller.member.modify);
router.get("/modify.do/:id/:login_type", controller.member.modifyDo);


router.get("/", controller.member.index);

module.exports = router;