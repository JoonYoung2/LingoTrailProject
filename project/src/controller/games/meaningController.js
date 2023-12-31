const service = require ("../../service/games/meaningService");
const configure = {
    condition : async (req, res)=>{
        if(!req.session.userId){
            res.send(sessionChecklogin());
        }
        let language = await service.configure.getLanguage();
        let level = await service.configure.getLevel();
        res.render("games/meaning/condition.ejs", {language, level});
    },
    showGames : async (req, res)=>{
        if(!req.session.userId){
            res.send(sessionChecklogin());
        }
        //req.body = { level_step: '3', questionLanguage: '1', answerLanguage: '2' }
        let QeAn = await service.configure.getQeAn(req.body); //QeAn means Question and Answer.
        let given = await service.configure.getGiven(req.body, QeAn); //given means given selectors.
        let getQuestion = await service.configure.getQuestion(req.body);
        let getAnswer = await service.configure.getAnswer(req.body);
        let getHeart = await service.configure.getHeart(req.session.userId);
        let chosenLevel = req.body.level_step;
        console.log(chosenLevel);
        res.render("games/meaning/show", {QeAn, given, getQuestion, getAnswer, getHeart, chosenLevel});
    },
    result : async (req, res)=>{
        //let score=req.query.score;
        let rankingPoint=req.query.rankingPoint;
        let heart = req.query.heart;
        let id = req.session.userId;
        let usedHeart = req.session.usedHeart;
        if(usedHeart==1){
            await service.configure.setHeart(heart, id);
        }
        await service. configure.setScore(rankingPoint, id);
        if(rankingPoint==0){
            window.history.back();
        }
        res.redirect("/ranking/meaning_game");
        //res.send(`<script>alert("점수는 ${score}이며, 랭킹포인트는 ${rankingPoint}입니다."); location.href="/ranking/meaning_game";</script>`);
        //res.render("ranking/meaning_game",{});
    }

}

const meaningCrud = {
    getList : async(req, res) => {
        // if(req.session.loginType== undefined){
        //     res.redirect("/member");
        // }else if(req.session.loginType !==1){
        //     res.redirect("/member");
        // }
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
    },

    insertList : async (req, res) =>{
        let level = await service.meaningCrud.getLevel();
        let maxId = await service. meaningCrud.getMaxId();
        if(req.session.loginType== undefined){
            res.redirect("/member");
        }else if(req.session.loginType !==1){
            res.redirect("/member");
        }else{
            res.render("admin/games/meaning/insert_form",{level, maxId});
        }
        
    },

    insertDo : async (req, res) =>{
        service.meaningCrud.insertDo(req.body);
        let level = await service.meaningCrud.getLevel();
        let maxId = await service. meaningCrud.getMaxId();
        if(req.session.loginType== undefined){
            res.redirect("/member");
        }else if(req.session.loginType !==1){
            res.redirect("/member");
        }
        res.render("admin/games/meaning/insert_form",{level, maxId});
    }

    
}
const sessionChecklogin =()=>{
    return `<script>alert("로그인 후 이용해주세요."); location.href="/member/login?game=meaning";</script>`
}
module.exports={configure, meaningCrud};