const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const configure = {
    getQeAn : async (level)=>{ //1
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select question, answer from english_meaning_question 
                        where level_step='${level}'
                        order by dbms_random.value)
                        where rownum <=10`;
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("result.rows ::::: ", result.rows);
        return result.rows;
    },

    getGiven : async (level) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from (select answer from english_meaning_question 
                        where level_step='${level}' 
                        order by dbms_random.value)`;
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("result.rows 들러리들 :::::", result.rows);
        return result.rows;
    }
}
module.exports ={configure};