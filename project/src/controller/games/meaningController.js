const service = require ("../../service/games/meaningService");
const configure = {
    condition : async (req, res)=>{
        let language = await service.configure.getLanguage();
        let level = await service.configure.getLevel();
        res.render("games/meaning/condition.ejs", {language, level});
    },
    showGames : async (req, res)=>{
        //req.body = { level_step: '3', questionLanguage: '1', answerLanguage: '2' }
        let QeAn = await service.configure.getQeAn(req.body); //QeAn means Question and Answer.
        let given = await service.configure.getGiven(req.body, QeAn); //given means given selectors.
        let getQuestion = await service.configure.getQuestion(req.body);
        let getAnswer = await service.configure.getAnswer(req.body);
        res.render("games/meaning/show", {QeAn, given, getQuestion, getAnswer});
    },
    result : (req, res)=>{
        let score=req.query.score;
        res.render("games/meaning/result",{score});
    }

}

const meaningCrud = {
    getList : async(req, res) => {
        const totalContent = await service.meaningCrud.totalContent();//총 글에 대한 개수를 가져옴.
        const data = await service.meaningCrud.list( req.query.start, totalContent );

        console.log("data ==> ", data);

        let info = data.list; //{ ID: 99, KOREAN: '재미있는', ENGLISH: 'enjoyable', LEVEL_STEP: 4 },,,,
        let level = await service.configure.getLevel();
        console.log(level);
        res.render("admin/games/meaning/main_list",{info, level, start : data.start, totalContent, page : data.page});
    },

    deleteList : async (req, res) =>{
        await service.meaningCrud.deleteList(req.body);
        res.json(1);
    },
    updateList : async (req, res)=>{
        service.meaningCrud.updateList(req.body);
        res.json(1);
    },

    postList : async (req, res) => {
        res.redirect("/meaning/listForm");
    }

    
}
module.exports={configure, meaningCrud};