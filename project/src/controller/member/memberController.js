const service = require("../../service/member/memberService");

var cnt = 1;
const member = {
    register : (req, res)=>{
        res.render("member/register_form", {member : member.rows, userId : req.session.userId});
    },

    registerDo : async (req, res) => {
        const msg = await service.member.registerDo(req.body);
        if(msg!=="회원 가입이 완료되었습니다.로그인해주세요.") {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        } else {
            res.send(`<script>alert('${msg}'); location.href="/member/login";</script>`);
        }
    },

    login : (req, res) => {
        let game = req.query.game;
        console.log("server game ==> ", game);
        res.render("member/login_form", {userId : req.session.userId, game});
    },

    loginDo : async (req, res) => {
        const msg = await service.member.loginDo(req.body, req.session);
        const game = req.body.game;
        if(msg !== "로그인 되었습니다.") {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }else{
            if(game=='meaning'){
                res.redirect("/meaning/condition");
            }else if(game == 'photo'){
                res.redirect("/game1/list");
            }else if (game =='blank'){
                res.redirect("blank_question/step");
            }else if (game == 'listening'){
                res.redirect("speak_question/step");
            }
            else{
                res.send(`<script>alert('${msg}'); location.href="/member";</script>`);
            }
            //res.redirect("/");
        }
    },

    logout : (req, res)=>{
        res.send(
            `
                <script>
                    if(window.confirm('로그아웃 하시겠습니까?')){
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
        if(!req.session.userId){
            res.send(userViewRedirect());
        }
        let member = await service.member.getMember(req.session.userId);
        console.log("여기야 여기", member);
        res.render("member/info_form", {member : member.rows, userId : req.session.userId});
    },

    pwCheck : (req,res)=>{
        res.render("member/pwCheck_form", {member : member.rows, userId : req.session.userId});
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
        if(!req.session.userId){
            res.send(userViewRedirect());
        }
        let getMember = await service.member.getMember(req.session.userId);
        let member = getMember.rows[0];
        //getMember.rows[0] = { ID: 're', NAME: 're', EMAIL: 're', PW: 're', LOGIN_TYPE: 0 }
        console.log("member==>", member);
        res.render("member/update_form", {member : member, userId : req.session.userId});
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
        if(!req.session.userId){
            res.send(userViewRedirect());
        }
        res.render("member/unregister_form", {member : member.rows, userId : req.session.userId});
    },

    unregisterDo : async(req, res) => {
        const msg = await service.member.unregisterDo(req.body, req.session);
        if(msg !== "회원탈퇴가 완료되었습니다.") {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        } else {
            res.send(`<script>alert('${msg}'); location.href="/";</script>`);
        }
    },
    memberlist : async (req, res) => {
        if(!req.session.userId){
            res.send(userViewRedirect());
        }
        let member = await service.member.getMemberList(req.session.userId);
        console.log("여기야 여기", member);
        res.render("member/memberlist", {member : member.rows, userId : req.session.userId, cnt : cnt});
    },

    modify : (req, res)=>{
        if(!req.session.userId){
            res.send(userViewRedirect());
        }
        console.log("타입 1: ", req.params.id);
        console.log("타입 2: ", req.params.login_type);
        res.send(
            `
            <script>
                if(window.confirm('타입 변경?')){
                    location.href='/member/modify.do/${req.params.id}/${req.params.login_type}';
                } else {
                    window.history.back();
                }
            </script>
            `
        )
    },

    modifyDo : async (req, res)=>{
        console.log("타입 변경 성공 : ", req.params.login_type);
        console.log("여기 안옴");

        let msg = await service.member.modifyDo(req.params.id, req.params.login_type);

        if(msg == "타입 변경이 완료되었습니다.") {
            res.send(`<script>alert('${msg}'); location.href="/member/memberlist";</script>`);
        } else {
            res.send(`<script>alert('${msg}'); window.history.back();</script>`);
        }
    },
    
    index : async(req, res) => {
        const member = await service.member.getMember(req.session.userId);
        const ranking = await service.member.getRanking(req.session);
        console.log(member);
        res.render("member/index", {userId : req.session.userId, member : member.rows[0], ranking});

    }
}

const userViewRedirect = () => {
    return `
    <script>
        alert("로그인 후 이용해주세요.");
        location.href="/member";
    </script>
`
    
}

module.exports={ member };