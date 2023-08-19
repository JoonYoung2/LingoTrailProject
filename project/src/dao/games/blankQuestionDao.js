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
        const sql = "select * from blank_question_level order by id asc";
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
        const sql = "select * from blank_question_language order by id asc";
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
        const sql = "select * from blank_part_name order by id asc";
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
        const sql = `select * from blank_question_config where id = '${session.userId}'`;
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    setUserConfig : async (language, level, partName, questionNum, id) => {
        console.log(level);
        console.log(language);
        console.log(partName);
        console.log(questionNum);
        console.log(id);
        
        const sql = `update blank_question_config set level_step=${level}, language=${language}, part=${partName}, question_amount=${questionNum} where id='${id}'`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    }
}

// Admin list View
const gameCrud = {
    getList : async (start, end) => {
        const sql = `select B.* from (select rownum rn , A.* from(select * from blank_question_game order by id desc) A)B where rn between ${start} and ${end}`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    insert : async (body) => {
        const sql = `insert into blank_question_game values(${body.id}, '${body.question}', '${body.answer}', '${body.meaning}', ${body.language}, ${body.parts}, ${body.level})`;
        const con = await oracledb.getConnection(dbConfig);

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    
    },

    updateList : async (id, question, answer, meaning, language, parts, level) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update blank_question_game set question = '${question[i]}', answer = '${answer[i]}', meaning = '${meaning[i]}', language = ${language[i]}, parts = ${parts[i]}, level_step = ${level[i]} where id = ${id[i]}`;
            try{
                con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },

    deleteList : async (body) => {
        const sql = `delete from blank_question_game where id in (${body.values})`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    getTotalContent : async () => {
        const sql = "select count(*) from blank_question_game"
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
        const sql = "select nvl(max(id), 0)+1 ID from blank_question_game";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    getLanguage : async () => {
        const sql = `select * from blank_question_language order by id asc`;
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
        const sql = `select * from blank_question_level order by id asc`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    getParts : async () => {
        const sql = `select * from blank_part_name order by id asc`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    search : async (body) => {
        
        const sql = `select g.* from blank_question_game g
        inner join blank_question_language ql on g.language = ql.id
        inner join blank_part_name p on g.parts = p.id
        inner join blank_question_level l on g.level_step = l.id
        where 
        g.question like '%${body.searchId}%' or
        g.answer like '%${body.searchId}%' or
        g.meaning like '%${body.searchId}%' or
        ql.language like '%${body.searchId}%' or
        p.part_name like '%${body.searchId}%' or
        l.level_step like '%${body.searchId}%'
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

// admin language CRUD

const languageCrud = {
    getMaxId : async () => {
        const sql = `select nvl(max(id), 0)+1 ID from blank_question_language`;
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0].ID;
    },

    insert : async (body) => {
        const sql = `insert into blank_question_language values(${body.id}, '${body.language}')`;
        const addColmnSql = `alter table blank_word_language add ${body.language} varchar2(255)`;
        const con = await oracledb. getConnection(dbConfig);

        try{
            await con.execute(sql);
            await con.execute(addColmnSql);
        }catch(err){
            console.log(err);
        }
    },

    updateList : async (id, language) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update blank_question_language set language='${language[i]}' where id=${id[i]}`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },

    deleteList : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `delete from blank_question_language where id in (${body.values})`

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    }
}

const levelCrud = {
    insert : async (highId) => {
        console.log(highId);
        const sql = `insert into blank_question_level values(${highId+1}, ${highId+1})`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    delete : async (highId) => {
        const sql = `delete from blank_question_level where id = ${highId}`;
        const con = await oracledb.getConnection(dbConfig);
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    getHighId : async () => {
        const sql = `select max(id) ID from blank_question_level`;
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0].ID;
    }
}

const partsCrud = {
    getMaxId : async () => {
        const sql = `select nvl(max(id), 0)+1 ID from blank_part_name`;
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0].ID;
    },

    insert : async (body) => {
        const sql = `insert into blank_part_name values(${body.id}, '${body.partName}')`;
        const con = await oracledb. getConnection(dbConfig);

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    updateList : async (id, partName) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update blank_part_name set part_name='${partName[i]}' where id=${id[i]}`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },

    deleteList : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `delete from blank_part_name where id in (${body.values})`

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    }
}

const wordCrud = {
    getWordList : async (start, end) => {
        const sql = `select B.* from (select rownum rn , A.* from(select * from blank_word_language order by id desc) A)B where rn between ${start} and ${end}`;
        const con = await oracledb.getConnection(dbConfig);
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows;
    },

    getTotalContent : async () => {
        const sql = "select count(*) from blank_word_language"
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
        const sql = "select nvl(max(id), 0)+1 ID from blank_word_language";
        const con = await oracledb.getConnection(dbConfig);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows[0]['ID'];
    },

    insert : async (body, language) => {
        let message = "";
        language.forEach((list) => {
            message += "'" + body[list.LANGUAGE] + "',";
        })
        message = message.substring(0, message.length - 1);

        const sql = `insert into blank_word_language values(${body.id}, ${body.partId}, ${message})`;
        const con = await oracledb.getConnection(dbConfig);
        console.log(sql);
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    delete : async (body) => {
        const sql = `delete from blank_word_language where id in (${body.values})`;
        const con = await oracledb.getConnection(dbConfig);

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    update : async (id, partId, content, language) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update blank_word_language set part_id = ${partId[i]},`;
            let contents = content[i].split(",");
            for(var j = 0; j < language.length; j++){
                sql += language[j].LANGUAGE + "='" + contents[j] + "',";
            }
            sql = sql.substring(0, sql.length-1);
            
            sql += `where id=${id[i]}`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },

    search : async (body, language) => {
        const con = await oracledb.getConnection(dbConfig);
        let sql = `select * from blank_word_language
        where `; 
        for(var i = 0; i < language.length; i++){
            sql+=`${language[i].LANGUAGE} like '%${body.searchId}%' or `;
        }
        sql = sql.substring(0, sql.length - 3);
        sql += `order by id desc`
        console.log(sql);
        
        let result;

        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }

        return result.rows;
    }
}

module.exports = {blankQuestion, gameConfig, gameCrud, languageCrud, levelCrud, partsCrud, wordCrud};