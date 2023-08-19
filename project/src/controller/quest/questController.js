const service = require("../../service/quest/questService");

const quest = {
    attend : async (req, res)=>{
        console.log(req.session.userId);
        let num = req.query.num;
        console.log("num ==> ", num);
        if(num == undefined){
            let stampResult = await service.quest.attend(req.session.userId);
            res.render("quest/attend",{stampResult, num});
        }else{
            let stampAmount = await service.quest.attendDo(req.session.userId);
            res.render("quest/attend", {stampResult : stampAmount, num});
        }
    },
    attendDo : async (req, res)=>{
        
        res.send(`<script>alert('하트 지급과 스탬프 적립이 완료되었습니다.'); location.href='/quest/attend?num=1';</script>`)
    },

    attendanceCheck : async (req, res) => {
        const getAttendance = await service.quest.attendanceCheck(req.session.userId);
        if(getAttendance){
            res.json(1);
        }else{
            res.json(0);
        }
    }

}
module.exports={quest};