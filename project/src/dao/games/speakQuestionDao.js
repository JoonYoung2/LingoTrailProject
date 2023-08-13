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
        const sql = `select * from speak_question_level order by id asc`
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
        const sql = `select * from speak_question_language order by id asc`;
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

// Admin list View
const gameCrud = {
    getList : async (start, end) => {
        const sql = `select B.* from (select rownum rn , A.* from(select * from speak_question_game order by id desc) A)B where rn between ${start} and ${end}`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    getLanguage : async () => {
        const sql = `select * from speak_question_language order by id asc`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    getLevel : async () => {
        const sql = `select * from speak_question_level order by id asc`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
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
    },

    updateList : async (id, question, answer, language, level) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update speak_question_game set question='${question[i]}', answer='${answer[i]}', language=${Number(language[i])}, level_step=${Number(level[i])} where id='${Number(id[i])}'`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },

    getTotalContent : async () => {
        const sql = "select count(*) from speak_question_game"
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['COUNT(*)'];
    },

    getMaxId : async () => {
        const sql = "select nvl(max(id), 0)+1 ID from speak_question_game";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    insert : async (body) => {
        console.log(body.level);
        const sql = `insert into speak_question_game values(${Number(body.id)}, '${body.question}', '${body.answer}', ${Number(body.language)}, ${Number(body.level)})`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    search : async (body) => {
        const sql = `select g.* from speak_question_game g
        inner join speak_question_language la on g.language = la.id
        inner join speak_question_level le on g.level_step = le.id
        where g.question like '%${body.searchId}%' 
        or g.answer like '%${body.searchId}%' 
        or la.language like '%${body.searchId}%' 
        or le.level_step like '%${body.searchId}%'
        order by g.id desc`;

        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows;
    }
}

const languageCrud = {
    getMaxId : async () => {
        const sql = "select nvl(max(id), 0)+1 ID from speak_question_language";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    insert : async (body) => {
        const sql = `insert into speak_question_language values(${Number(body.id)}, '${body.language}')`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    delete : async (body) => {
        const sql = `delete from speak_question_language where id in (${body.values})`;
        const gameSql = `delete from speak_question_game where language in (${body.values})`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
            await con.execute(gameSql);
        }catch(err){
            console.log(err);
        }
    },

    update : async (id, language) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update speak_question_language set language='${language[i]}' where id='${Number(id[i])}'`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    }
}

const levelCrud = {
    getMaxId : async () => {
        const sql = "select nvl(max(id), 0)+1 ID from speak_question_level";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    insert : async (maxId) => {
        const sql = `insert into speak_question_level values(${Number(maxId)}, ${Number(maxId)})`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    getHighId : async () => {
        const sql = "select max(id) ID from speak_question_level";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    delete : async (highId) => {
        const sql = `delete from speak_question_level where id=${highId}`;
        const gameSql = `delete from speak_question_game where level_step = (${highId})`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
            await con.execute(gameSql);
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud};