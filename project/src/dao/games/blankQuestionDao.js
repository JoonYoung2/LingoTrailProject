const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

// 게임 뷰
const blankQuestion = {
    startGame : async (language, level, partName, rownum) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select * from blank_question_game where language=${language} and parts=${partName} and level_step=${level} order by dbms_random.value) where rownum <= ${rownum}`;
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        console.log(result);
        return result.rows;
    },

    getWord : async (language, partName) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select ${language[0].LANGUAGE} from blank_word_language where part_id = ${partName}`;
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        console.log(result);
        return result.rows;
    },

    getLanguageName : async (language) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select language from blank_question_language where id = ${language}`;
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
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select * from blank_question_level";
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    getLanguage : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select * from blank_question_language";
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log(result.rows);
        return result.rows;
    },

    getPartName : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select * from blank_part_name";
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log(result.rows);
        return result.rows;
    },

    getUserConfig : async (session) => {
        let sql = `select * from blank_question_config where id = '${session.userId}'`;
        let con = await oracledb.getConnection(dbConfig);

        try{

        }catch{
            
        }
    }
}

// Admin list View
const gameCrud = {
    getList : async (start, end) => {
        
    }
}

// admin language CRUD

const languageCrud = {
    getMaxId : async () => {
        
    }
}

const levelCrud = {
    getMaxId : async () => {
        
    }
}

const wordCrud = {
    getWordList : async (start, end) => {
        
    }
}

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};