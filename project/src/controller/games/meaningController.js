const service = require ("../../service/games/meaningService");
const configure = {
    condition : (req, res)=>{
        res.render("games/meaning/condition.ejs");
    },
    showGames : async (req, res)=>{
        let QeAn = await service.configure.getQeAn(req.body); //QeAn means Question and Answer.
        let given = await service.configure.getGiven(req.body, QeAn); //given means given selectors.
        res.render("games/meaning/show", {QeAn, given});
    },
    result : (req, res)=>{
        let score=req.query.score;
        res.render("games/meaning/result",{score});
    }

}

const meaningCrud = {
    getList : (req, res) => {

    }
}
module.exports={configure, meaningCrud};