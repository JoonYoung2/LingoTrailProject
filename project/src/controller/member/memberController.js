const service = require("../../service/member/memberService");

const member = {
    register : (req, res)=>{
        res.render("member/register_form", {member:member.rows, userId : req.session.userId});
    },

    registerDo : async (req, res)=>{
        const msg = await service.member.registerDo(req.body);
        if(msg!=="회원 가입이 완료되었습니다.로그인해주세요.") {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        } else {
            res.send(`<script>alert('${msg}'); location.href="/member/login";</script>`);
        }
    },

    login : (req, res)=>{
        res.render("member/login_form", {member:member.rows, userId : req.session.userId});
    },

    loginDo : async (req, res)=>{
        const msg = await service.member.loginDo(req.body, req.session);
        if(msg !=="로그인 되었습니다.") {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }else{
            res.send(`<script>alert('${msg}'); location.href="/member";</script>`);

            //res.redirect("/");
        }
    },

    logout : (req, res)=>{
        res.send(
            `
                <script>
                    if(window.confirm('로그아웃?')){
                        location.href='/member/logout.do';
                    }else{
                        window.history.back();
                    }
                </script>
            `
            )
    },

    logoutDo : (req, res)=>{
        console.log("여기 안옴");
        req.session.destroy();
        res.send(`<script>alert('로그아웃 되었습니다.'); location.href="/";</script>`);
    },

    info : async (req, res)=>{
        let member= await service.member.getMember(req.session.userId);
        console.log("여기야 여기", member);
        res.render("member/info_from", {member:member.rows, userId : req.session.userId});
    },

    pwCheck : (req,res)=>{
        res.render("member/pwCheck_form", {member:member.rows, userId : req.session.userId});
    },

    pwCheckDo : async (req, res)=>{
        let msg = await service.member.pwCheckDo(req.body, req.session);
        if(msg !== "본인 인증에 성공했습니다."){
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }else{
            res.send(`<script>alert('${msg}'); location.href="/member/update";</script>`);
        }
    },

    update : async (req, res)=>{
        let getMember = await service.member.getMember(req.session.userId);
        let member = getMember.rows[0];
        //getMember.rows[0] = { ID: 're', NAME: 're', EMAIL: 're', PW: 're', LOGIN_TYPE: 0 }
        console.log("member==>", member);
        res.render("member/update_form", {member:member, userId : req.session.userId});
    },

    updateDo : async (req, res)=>{
        let msg = await service.member.updateDo(req.body);
        if(msg == "회원정보 수정이 완료되었습니다.") {
            res.send(`<script>alert('${msg}'); location.href="/member/info";</script>`);
        } else {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }
    },

    unregister : (req, res)=>{
        res.render("member/unregister_form", {member:member.rows, userId : req.session.userId});
    },

    unregisterDo : async(req, res)=>{
        const msg = await service.member.unregisterDo(req.body, req.session);
        if(msg !== "회원탈퇴가 완료되었습니다."){
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }else{
            res.send(`<script>alert('${msg}'); location.href="/";</script>`);
        }
    },

    index : async(req, res) => {
        const member = await service.member.getMember(req.session.userId);
        console.log(member);
        res.render("member/index", {userId : req.session.userId, member : member.rows[0]});
    }
}

module.exports={member};