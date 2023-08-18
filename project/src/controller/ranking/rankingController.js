const service = require("../../service/ranking/rankingService");

var cnt = 1;
const views = {
    list: async (req, res) => {
        //let list = await game1Service.getAll();
        res.render("ranking/ranking", {userId : req.session.userId});
    },
    
    score: async (req, res) => {
        let total = await service.views.getScore();
        console.log("controller total : ", total);
        res.render("ranking/score", {userId : req.session.userId, total : total, cnt : cnt});
    },

    game01: async (req, res) => {
        let total = await service.views.getGame01();
        console.log("controller total : ", total);
        res.render("ranking/game01", {userId : req.session.userId, total : total, cnt : cnt});
    },

    game02: async (req, res) => {
        let total = await service.views.getGame02();
        console.log("controller total : ", total);
        res.render("ranking/game02", {userId : req.session.userId, total : total, cnt : cnt});
    },

    game03: async (req, res) => {
        //let list = await game1Service.getAll();
        let total = await service.views.getGame03();
        console.log("controller total : ", total);
        res.render("ranking/game03", {userId : req.session.userId, total : total, cnt : cnt});
    },

    total: async (req, res) => {
        //let list = await game1Service.getAll();
        let total = await service.views.getTotal();
        console.log("controller total : ", total);
        res.render("ranking/total", {userId : req.session.userId, total : total, cnt : cnt});
    }
}

const process = {

}

module.exports = { views, process };