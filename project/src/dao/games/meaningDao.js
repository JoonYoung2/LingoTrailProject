const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const configure = {
    getQeAn : async (level)=>{ //1
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select korean, english from english_meaning_question 
                        where level_step='${level}'
                        order by dbms_random.value)
                        where rownum <=10`;
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },

    getGivenEng : async (level) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select english from english_meaning_question 
                        where level_step='${level}' 
                        order by dbms_random.value)`;
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },
    getGivenKor : async (level) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select korean from english_meaning_question 
                        where level_step='${level}' 
                        order by dbms_random.value)`;
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;

    },

    getLanguage : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from question_language`;

        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },
    getLanguageSet : async (language)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select language from question_language where id='${language}'`
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows[0].LANGUAGE;//KOREAN
    },
    getLevel : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from question_level`;

        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    }
}
const meaningCrud = {
    getAllforAdmin : async()=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from english_meaning_question`;

        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows;
    },
    deleteList : async (body) => {
        console.log("bidydibyidbyidbody",body.values);
        const con = await oracledb.getConnection(dbConfig);
        const sql = `delete from english_meaning_question where id in (${body.values})`;
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },

    updateList : async (id, level, korean, english) => {
        const con = await oracledb.getConnection(dbConfig);
        for(var i = 0; i < id.length; i++){
            let sql = `update english_meaning_question set level_step=${level[i]}, korean='${korean[i]}', english='${english[i]}' where id=${id[i]}`;
            try{
                await con.execute(sql);
            }catch(err){
                console.log(err);
            }
        }
    },
    totalContent : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select count(*) from english_meaning_question`;
        let totalContent;
        try{
            totalContent = await con.execute( sql );
        }catch(err){
            console.log(err);
        }
        return totalContent;
    },
    list : async (start, end) => {
        console.log(start);
        console.log(end);
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select B.* from (select rownum rn , A.* from(select * from english_meaning_question order by id desc) A)B where rn between ${start} and ${end}`;
        let result;
        try{
            result = await con.execute(sql);

        }catch(err){
            console.log(err);
        }
        return result;
    }
}
module.exports = {configure, meaningCrud};