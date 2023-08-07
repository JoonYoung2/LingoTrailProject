const router = require("express").Router();
const controller = require("../../controller/memberController");

router.get("/", (req, res) => {
    res.send(`member/index 페이지 입니당<br><a href="/member/loginForm">로그인</a> <a href="/member/registerForm">회원가입</a>`);
})

module.exports = router;