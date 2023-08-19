const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const quest = {
    getQuestInfo : async (id) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT attend_date, stamp, heart FROM member_info WHERE id='${id}'`;
        let dateRecord=0;
        try{
            dateRecord = await con.execute(sql);
        }catch(err){
            console.log(err)
        }
        console.log("***********",dateRecord.rows[0]);
        //
        return dateRecord.rows[0];
    },
    setStamp : async (id) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `UPDATE member_info SET stamp = 0 WHERE id='${id}'`;
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err)
        }
    },

    addStamp : async(id,stampAmount)=>{
        const con = await oracledb.getConnection(dbConfig);
        let sql;
        if(stampAmount==15){
            sql = `UPDATE member_info SET stamp=1 WHERE id='${id}'`;
        }else{
            sql = `UPDATE member_info SET stamp=stamp+1 WHERE id='${id}'`;
        }
        
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err)
        }
    },
    updateDate : async(id, today)=>{
        const con = await oracledb.getConnection(dbConfig);
        console.log(today);
        const sql = `UPDATE member_info SET attend_date='${today}' WHERE id='${id}'`;
        
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err)
        }
    },
    getStampAmount : async (id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT stamp FROM member_info WHERE id = '${id}'`;
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }return result;
    },
    addHeart : async(id, stamp)=>{
        const con = await oracledb.getConnection(dbConfig);
        let num;
        if(stamp == 4){
            num=2;
        }else if(stamp == 9){
            num=3;
        }else if(stamp ==14){
            num=4;
        }else{
            num=1;
        }
        const sql = `UPDATE member_info SET heart=heart+${num} WHERE id='${id}'`;
        
        try{
            await con.execute(sql);
        }catch(err){
            console.log(err)
        }
    },


}
module.exports = {quest};