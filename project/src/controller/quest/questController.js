const service = require("../../service/quest/questService");

const quest = {
    attend : async (req, res)=>{
        console.log(req.session.userId);
        let stampResult = await service.quest.attend(req.session.userId);
            res.render("quest/attend",{stampResult});
    },
    attendDo : async (req, res)=>{
        let result = await service.quest.attendDo(req.session.userId);
    }

}
module.exports={quest};