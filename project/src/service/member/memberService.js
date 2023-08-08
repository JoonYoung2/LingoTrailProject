const session = require("express-session");
const dao = require("../../dao/member/memberDao");

const member = {
    registerDo : async (body)=>{//{ id: 'dkdk', name: 'dkdk', email: 'dkdk', pw: 'dkdk' }
        let existCh = await dao.member.getMemInfo(body.id);
        if(existCh.rows[0]){
            return "이미 사용중인 아이디입니다.";
        }
        if(body.id.length==0 || body.id==""){
            return "아이디를 입력해주세요.";
        }else if(body.name.length ==0 || body.name==""){
            return "이름을 입력해주세요.";
        }else if(body.email.length ==0 || body.email==""){
            return "이메일을 입력해주세요.";
        }else if(body.pw.length ==0 || body.pw==""){
            return "비밀번호를 입력해주세요.";
        }
        let result = await dao.member.registerDo(body);
        if(result !== 1){
            return "오류가 발생했습니다. 다시 시도해주세요.";
        }
        return "회원 가입이 완료되었습니다.로그인해주세요."
    },

    loginDo : async (body, session)=>{ //{ id: 'rr', pw: 'rr' }
        let existCh = await dao.member.getMemInfo(body.id);
        let dbInfo = existCh.rows[0];
        if(dbInfo == undefined){
            return "가입된 아이디가 아닙니다.";
        } else {
            if(body.pw !== dbInfo.PW){
                return "비밀번호가 올바르지 않습니다."
            }else{
                session.userId = dbInfo.ID;
                session.loginType = dbInfo.LOGIN_TYPE;
                return "로그인 되었습니다.";
            }
        }
    },

    unregisterDo : async(body, session)=>{
        let existCh = await dao.member.getMemInfo(body.id);
        let dbInfo = existCh.rows[0];
        // console.log("session.userId : ",session.userId);
        // console.log("body : ",body);
        // console.log("existCh : ", existCh);
        // console.log("dbInfo : ", dbInfo);

        // console.log("==================");
        // console.log("session.userId", session.userId);
        // console.log("body.id", body.id);
        // console.log("body.pw",body.pw);
        // console.log("dbInfo.PW",dbInfo.PW);
        if(session.userId !== body.id){
            return "아이디가 올바르지 않습니다.";
        } else {
            if(body.pw !== dbInfo.PW){
                return "비밀번호가 올바르지 않습니다.";
            }else{
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
        if(body.pw !== dbInfo.PW){
            return "비밀번호가 올바르지 않습니다.";
        }else{
            return "본인 인증에 성공했습니다.";
        }
    },
    getMember : async(id)=>{
        let info = await dao.member.getMemInfo(id);
        return info;
    },
    updateDo : async(body)=>{
        let result = await dao.member.updateDo(body);
        console.log("result&&&&&&&&&&&&&&&&&: ",result);
        if(result == 0){
            return "오류가 발생했습니다. 다시 시도해주세요.";
        }else{
            return "회원정보 수정이 완료되었습니다.";
        }
    }
}

module.exports = {member};