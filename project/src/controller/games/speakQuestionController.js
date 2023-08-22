const service = require("../../service/games/speakQuestionService");

const speakQuestion = {
    startGame : async (req, res) => {
        let data = await service.speakQuestion.startGame(req.body, req.session);
        let language = await service.speakQuestion.getLanguage(req.body.answerLang);
        console.log("controller language ==> ",language);
        let word = await service.speakQuestion.getWord(data.rows, language, req.body.language, req.body.answerLang);
        let heart = await service.speakQuestion.getHeart(req.session);
        let sameLang = 0;
        let level = req.body.level_step;
        if(req.body.language == req.body.answerLang){
            sameLang = 1;
        }
        if(!req.session.userId){
            res.send(userViewRedirect());
        }else{
            res.render("games/speak/question_index", {data : data.rows, word, sameLang, content : req.body.contentState, language, heart, level});
        }
    }
}

const gameConfig = {
    stepForm : async (req, res) => {
        let config = await service.gameConfig.getConfig(req.session);
        let level = await service.gameConfig.getLevel();
        let language = await service.gameConfig.getLanguage();
        if(!req.session.userId){
            res.send(userViewRedirect());
        }else{
            res.render("games/speak/step", {level : level.rows, language : language.rows, config : config[0], userId : req.session.userId});
        }
    }
}

const gameCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.gameCrud.getTotalContent();
        const start = req.query.start;
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let data = await service.gameCrud.getList(start, totalCounter);
        console.log("contorller getList data ==> ", data);
        if(req.session.loginType == undefined){
            res.redirect("/member");
        }else if(!req.session.loginType == 1){
            res.redirect("/member");
        }else{
            if(data.list[0] === undefined){
                data.list = undefined;
                res.render("admin/games/speak/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page});
            }else{
                res.render("admin/games/speak/list", {data : data.list, language, level, start : data.start, totalCounter, page : data.page});
            }
        }
        
    },

    deleteList : async (req, res) => {
        service.gameCrud.deleteList(req.body);
        res.json(1);
    },

    updateList : async (req, res) => {
        service.gameCrud.updateList(req.body);
        res.json(1);
    },

    insert : async (req, res) => {
        let msg = await service.gameCrud.insert(req.body);
        console.log(msg);
        res.send(msg);
    },

    insertGetList : async (req, res) => {
        let maxId = await service.gameCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        res.json({maxId, language, level});
    },

    search : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        let level = await service.gameCrud.getLevel();
        let data = await service.gameCrud.search(req.body);
        console.log("data", data);
        console.log("language ==> ", language);
        console.log("level ==> ", level);
        if(data[0] === undefined){
            res.json({data : undefined, input : req.body});
        }else{
            res.json({language, level, data, input : req.body})
        }
    },

    heartUpdate : async (req, res) => {
        await service.gameCrud.heartUpdate(req.body, req.session);
        res.json(1);
    },

    saveScore : async (req, res) => {
        await service.gameCrud.saveScore(req.body, req.session);
        res.json(1);
    },

    heartScoreUpdate : async (req, res) => {
        await service.gameCrud.saveHeartScore(req.body, req.session);
        res.json(1);
    }
}

const languageCrud = {
    getList : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        if(req.session.loginType == undefined){
            res.redirect("/member");
        }else if(!req.session.loginType == 1){
            res.redirect("/member");
        }else{
            res.render("admin/games/speak/language_form", {language});
        }
    },

    getMaxId : async (req, res) => {
        let maxId = await service.languageCrud.getMaxId();
        res.json({maxId})
    },

    insert : async (req, res) => {
        await service.languageCrud.insert(req.body);
        res.redirect("/speak_question/language_form");
    },

    delete : async (req, res) => {
        await service.languageCrud.delete(req.body);
        res.json(1);
    },

    update : async (req, res) => {
        await service.languageCrud.update(req.body);
        res.json(1);
    }
}

const levelCrud = {
    getList : async (req, res) => {
        let level = await service.gameCrud.getLevel();
        if(req.session.loginType == undefined){
            res.redirect("/member");
        }else if(!req.session.loginType == 1){
            res.redirect("/member");
        }else{
            res.render("admin/games/speak/level_form", {level});
        }
    },

    insert : async (req, res) => {
        await service.levelCrud.insert();
        res.json(1);
    },

    delete : async (req, res) => {
        await service.levelCrud.delete();
        res.json(1);
    }
}

const wordCrud = {
    getList : async (req, res) => {
        const totalCounter = await service.wordCrud.getTotalContent();
        const start = req.query.start;
        let language = await service.gameCrud.getLanguage();
        let word = await service.wordCrud.getWordList(start, totalCounter);

        console.log(language);
        console.log(word);
        // if(req.session.loginType == undefined){
        //     res.redirect("/member");
        // }else if(!req.session.loginType == 1){
        //     res.redirect("/member");
        // }else{
        // }
        res.render("admin/games/speak/word_form", {language, word : word.list, start : word.start, page : word.page});
    },

    getMaxId : async (req, res) => {
        let maxId = await service.wordCrud.getMaxId();
        let language = await service.gameCrud.getLanguage();
        res.json({maxId, language});
    },

    insert : async (req, res) => {
        let msg = await service.wordCrud.insert(req.body);
        res.send(msg);
    },

    delete : async (req, res) => {
        await service.wordCrud.delete(req.body);
        res.json(1);
    },

    update : async (req, res) => {
        console.log("body ==> ", req.body);
        await service.wordCrud.update(req.body);
        res.json(1);
    },

    search : async (req, res) => {
        let language = await service.gameCrud.getLanguage();
        let data = await service.wordCrud.search(req.body, language);
        if(data[0] === undefined){
            res.json({language, data : undefined, input : req.body});
        }else{
            res.json({language, data, input : req.body})
        }
    }
}

const userViewRedirect = () => {
    return `
    <script>
        alert("로그인 후 이용해주세요.");
        location.href="/member/login?game=listening";
    </script>
`
    
}

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};