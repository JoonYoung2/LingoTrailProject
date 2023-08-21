const session = require("express-session");
const dao = require("../../dao/quest/questDao");


const quest = {
    attend: async (session) => {
        let questInfo = await dao.quest.getQuestInfo(session);//{ ATTEND_DATE: null, STAMP: null, HEART: null }
        let yesterdaydb = questInfo.ATTEND_DATE;
        let stampAmount = questInfo.STAMP;
        let heartAmount = questInfo.HEART;


        const yesterdayRecord = new Date(yesterdaydb);
        const yesterday = new Date(); //2023-08-18T10:48:05.316Z
        yesterday.setDate(yesterday.getDate() - 1);
        console.log("yesterday", yesterday);
        console.log("yesterdayDBDB", yesterdayRecord);


        const isSameDate = (
            yesterday.getFullYear() === yesterdayRecord.getFullYear() &&
            yesterday.getMonth() === yesterdayRecord.getMonth() &&
            yesterday.getDate() === yesterdayRecord.getDate()
        );

        if (isSameDate) {
            console.log('어제와 같은 날짜입니다.');
            return stampAmount;

        } else {
            console.log('어제와 다른 날짜입니다.');
            await dao.quest.setStamp(session); //스탬프 0으로 초기화
            return "0";
        }
        //db에서 select해서 어제 날짜로 출석했는지 확인(null, 옛날 날짜, 어제날짜)
        //true이면 가지고 있는 스탬프 개수 조회, 해당 이미지 출력
        //false이면 스탬프 개수 초기화, main 페이지 출력.
        //db (출석 날짜, 스탬프 개수, 하트)
    },
    attendDo: async (session) => {
        //db에 스탬프 개수 1증가, 오늘 출첵 날짜 db에 업데이트,  하트 증가, alert (확인)=> 한칸 증가된 이미지 출력.
        console.log("121212121212jejejeje");
        let beforeStampAmount = await dao.quest.getStampAmount(session);//스탬프 개수 가져오기(업뎃 전)
        await dao.quest.addStamp(session,beforeStampAmount);//스탬프 1 증가

        let stampAmount = await dao.quest.getStampAmount(session);
        console.log("gdgdgdgdgdgdggdgdgdd",stampAmount);
        let today = new Date();
        console.log(today);
        console.log("todaytoday questService",today);

        await dao.quest.updateDate(session, today);//오늘 출첵일 업데이트
        
        await dao.quest.addHeart(session, stampAmount);//하트 증가
        console.log("stampAmount",stampAmount);
        return stampAmount;
    },
    attendanceCheck : async (session)=>{
        const attendance = await dao.quest.attendanceCheck(session);//Sat Aug 19 2023 17:33:17 GMT+0900 (대한민국 표준시)
        const attendancedb = new Date(attendance);
        const today = new Date();

        const isSameDate = (
            attendancedb.getFullYear() === today.getFullYear() &&
            attendancedb.getMonth() === today.getMonth() &&
            attendancedb.getDate() === today.getDate()
        );

        if (isSameDate) {
            console.log('이미 출석함. ');
            return true;

        } else {
            console.log('오늘 출석 안함');
            return false;
        }
    }
}
module.exports = { quest };