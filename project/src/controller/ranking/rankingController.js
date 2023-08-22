const service = require("../../service/ranking/rankingService");

var cnt = 1;
const views = {
    list: async (req, res) => {
        //let list = await game1Service.getAll();
        res.render("ranking/ranking", {userId : req.session.userId});
    },
    
    score: async (req, res) => {
        let member = await service.views.getScore(req.session.userId);
        console.log("controller member : ", member);
        res.render("ranking/score", {userId : req.session.userId, member : member, cnt : cnt});
    },
    
    meaning_game: async (req, res) => {
        let member = await service.views.getGame01();
        console.log("controller member : ", member);
        res.render("ranking/meaning_game", {userId : req.session.userId, member : member, cnt : cnt});
    },
    
    photo_game: async (req, res) => {
        let member = await service.views.getGame02();
        console.log("controller member : ", member);
        res.render("ranking/photo_game", {userId : req.session.userId, member : member, cnt : cnt});
    },

    blank_game: async (req, res) => {
        //let list = await game1Service.getAll();
        let member = await service.views.getGame03();
        console.log("controller member : ", member);
        res.render("ranking/blank_game", {userId : req.session.userId, member : member, cnt : cnt});
    },

    listening_game: async (req, res) => {
        //let list = await game1Service.getAll();
        let member = await service.views.getGame04();
        console.log("controller member : ", member);
        res.render("ranking/listening_game", {userId : req.session.userId, member : member, cnt : cnt});
    },

    total: async (req, res) => {
        //let list = await game1Service.getAll();
        let member = await service.views.getTotal();
        console.log("controller member : ", member);
        res.render("ranking/total", {userId : req.session.userId, member : member, cnt : cnt});
    }
}
module.exports = { views };