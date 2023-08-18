const router = require("express").Router();
const controller = require("../../controller/member/memberController");

router.get("/", (req, res) => {
    let msg = "";
    if(req.session.userId){
        msg="세션 있음, 로그인 되어 있는 상태임";
    }else{
        msg="세션 없음. 로그인 안되어 있는 상태임";
    }
    res.send(`member/index 페이지 입니당<br><a href="/member/login">로그인</a> <a href="/member/register">회원가입</a>
                <a href="/member/logout">로그아웃</a> <a href="/member/unregister">회원탈퇴</a>
                <a href="/member/info">내정보</a>        
                <br> ${msg}`);
})

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
module.exports = router;