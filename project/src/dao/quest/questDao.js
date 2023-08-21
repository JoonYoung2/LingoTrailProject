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
        console.log("dao today",today);
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
        }return result.rows[0].STAMP;
    },
    addHeart : async(id, stampAmount)=>{
        console.log("dkdkdkdkdkstampAmount", stampAmount); //1
        const con = await oracledb.getConnection(dbConfig);
        //stamp = stampAmount.rows[0].STAMP;
        let num;
        if(stampAmount == 5){
            num=2;
        }else if(stampAmount == 10){
            num=3;
        }else if(stampAmount ==15){
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
    attendanceCheck : async(id)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT attend_date FROM member_info WHERE id='${id}'`;
        let result;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err)
        }console.log("Dao result===>",result.rows[0].ATTEND_DATE);
        return result.rows[0].ATTEND_DATE;
    }


}
module.exports = {quest};