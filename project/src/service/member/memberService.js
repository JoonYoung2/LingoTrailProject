const session = require("express-session");
const dao = require("../../dao/member/memberDao");
const bcrypt = require("bcrypt");

const member = {
    registerDo : async (body)=>{ //{ id: 'dkdk', name: 'dkdk', email: 'dkdk', pw: 'dkdk' }
        let existCh = await dao.member.getMemInfo(body.id);
        if(existCh.rows[0]) {
            return "이미 사용중인 아이디입니다.";
        }
        if(body.id.length == 0 || body.id == "") {
            return "아이디를 입력해주세요.";
        } else if(body.name.length == 0 || body.name == "") {
            return "이름을 입력해주세요.";
        } else if(body.email.length == 0 || body.email == "") {
            return "이메일을 입력해주세요.";
        } else if(body.pw.length ==0 || body.pw==""){
            return "비밀번호를 입력해주세요.";
        } else if(body.pw.login_type == 0 || body.login_type == ""){
            return "타입을 선택해주세요.";
        }

        const pwd = body.pw;
        const changePwd = bcrypt.hashSync(pwd, 10);
        body.pw = changePwd;

        console.log("비밀번호 비교 : ", pwd == changePwd);

        let result = await dao.member.registerDo(body);
        if(result !== 1) {
            return "오류가 발생했습니다. 다시 시도해주세요.";
        }
        return "회원 가입이 완료되었습니다.로그인해주세요.";
    },

    loginDo : async (body, session)=>{ //{ id: 'rr', pw: 'rr' }
        let existCh = await dao.member.getMemInfo(body.id);
        let dbInfo = existCh.rows[0];
        const result = bcrypt.compareSync(body.pw, dbInfo.PW);

        if(dbInfo == undefined){
            return "가입된 아이디가 아닙니다.";
        } else {
            if(!result) {
                return "비밀번호가 올바르지 않습니다."
            } else {
                session.userId = dbInfo.ID;
                session.loginType = dbInfo.LOGIN_TYPE;
                return "로그인 되었습니다.";
            }
        }
    },

    unregisterDo : async(body, session)=>{
        let existCh = await dao.member.getMemInfo(body.id);
        let dbInfo = existCh.rows[0];
        const result = bcrypt.compareSync(body.pw, dbInfo.PW);
        // console.log("session.userId : ",session.userId);
        // console.log("body : ",body);
        // console.log("existCh : ", existCh);
        // console.log("dbInfo : ", dbInfo);

        // console.log("==================");
        // console.log("session.userId", session.userId);
        // console.log("body.id", body.id);
        // console.log("body.pw",body.pw);
        // console.log("dbInfo.PW",dbInfo.PW);
        console.log("=== 회원 탈퇴 ===", dbInfo);
        console.log("=== 비번 확인 ===", body.pw);

        if(session.userId !== body.id) {
            return "아이디가 올바르지 않습니다.";
        } else {
            if(!result) {
                return "비밀번호가 올바르지 않습니다.";
            } else {
                await dao.member.unregisterDo(body.id);
                session.destroy();
                return "회원탈퇴가 완료되었습니다.";
            }
        }       
    },

    pwCheckDo : async (body, session)=>{
        let existCh = await dao.member.getMemInfo(session.userId);
        let dbInfo = existCh.rows[0];
        // console.log("existCh : ", existCh);
        // console.log("dbInfo : ", dbInfo);
        // console.log("body.pw: ", body.pw);
        // console.log("dbInfo.PW: ", dbInfo.PW);
        const result = bcrypt.compareSync(body.pw, dbInfo.PW);

        if(!result) {
            return "비밀번호가 올바르지 않습니다.";
        } else {
            return "본인 인증에 성공했습니다.";
        }
    },

    getMember : async(id)=>{
        console.log(":::::::::::::::::::::::",id);
        let info = await dao.member.getMemInfo(id);
        return info;
    },

    updateDo : async (body) => {

        console.log("비번 : ", body.pw);

        if(body.pw !== "") {
            const pwd = body.pw;
            const changePwd = bcrypt.hashSync(pwd, 10);
            body.pw = changePwd;
        }

        let result = await dao.member.updateDo(body);
        console.log("result&&&&&&&&&&&&&&&&&: ", result);
        if(result == 0) {
            return "오류가 발생했습니다. 다시 시도해주세요.";
        } else{
            return "회원정보 수정이 완료되었습니다.";
        }
    },

    getMemberList : async (id) => {
        console.log(":::::::::::::::::::::::", id);
        let info = await dao.member.getMemberList(id);
        return info;
    },

    modifyDo : async (id, login_type) => {        
        console.log("역시 잘됨 : ", login_type);

        let result = await dao.member.modifyDo(id, login_type);
        console.log("result&&&&&&&&&&&&&&&&&: ", result);

        if(result == 0) {
            return "오류가 발생했습니다. 다시 시도해주세요.";
        } else {
            return "타입 변경이 완료되었습니다.";
        }
    }
}

module.exports = {member};