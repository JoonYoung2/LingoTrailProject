const service = require("../../service/ranking/rankingService");

var cnt = 1;
const views = {
    list: async (req, res) => {
        //let list = await game1Service.getAll();
        res.render("ranking/ranking", {userId : req.session.userId});
    },
    
    score: async (req, res) => {
        let member = await service.views.getScore();
        console.log("controller member : ", member);
        res.render("ranking/score", {userId : req.session.userId, member : member, cnt : cnt});
    },
    
    game01: async (req, res) => {
        let member = await service.views.getGame01();
        console.log("controller member : ", member);
        res.render("ranking/game01", {userId : req.session.userId, member : member, cnt : cnt});
    },
    
    game02: async (req, res) => {
        let member = await service.views.getGame02();
        console.log("controller member : ", member);
        res.render("ranking/game02", {userId : req.session.userId, member : member, cnt : cnt});
    },

    game03: async (req, res) => {
        //let list = await game1Service.getAll();
        let member = await service.views.getGame03();
        console.log("controller member : ", member);
        res.render("ranking/game03", {userId : req.session.userId, member : member, cnt : cnt});
    },

    total: async (req, res) => {
        //let list = await game1Service.getAll();
        let member = await service.views.getTotal();
        console.log("controller member : ", member);
        res.render("ranking/total", {userId : req.session.userId, member : member, cnt : cnt});
    }
}
module.exports = { views };