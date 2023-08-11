const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

// 게임 뷰
const speakQuestion = {
    startGame : async (body) => {
        const sql = `select * from speak_question_game where language=${body.language} and level_step=${body.level_step}`;
        console.log(sql);
        const con = await oracledb.getConnection(dbConfig);
        let data;
        try{
            console.log("dao 여긴 오니?");
            data = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return data;
    },

    getWord : async () => {
        const sql = "select * from speak_word_language";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        console.log(result);
        return result.rows;
    }
}

// 설정 뷰
const gameConfig = {
    getLevel : async () => {
        const sql = `select * from speak_question_level`
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result;
    },

    getLanguage : async () => {
        const sql = `select * from speak_question_language`;
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result;
    }
}

const gameCrud = {
    getList : async () => {
        const sql = `select * from speak_question_game order by id desc`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("dao getList result ==> ", result);
        return result.rows;
    },

    deleteList : async (body) => {
        console.log(body);
        const sql = `delete from speak_question_game where id in (${body.values})`;
        const con = await oracledb.getConnection(dbConfig);
        console.log("여기 delete 오낭?", sql);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {speakQuestion, gameConfig, gameCrud};