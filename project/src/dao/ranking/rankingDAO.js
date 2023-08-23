const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const views = {   
    getScoreInfo : async (id) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info where id = '${id}'`;
        let member;
        try {
            member = await con.execute(sql);
        } catch(err) {
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    },
    getGame01Info : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info order by meaning_game desc`;
        let member;
        try{
            member = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    },
    getGame02Info : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info order by photo_game desc`;
        let member;
        try{
            member = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    },
    getGame03Info : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info order by blank_game desc`;
        let member;
        try {
            member = await con.execute(sql);
        } catch(err) {
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    },
    getGame04Info : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info order by listening_game desc`;
        let member;
        try {
            member = await con.execute(sql);
        } catch(err) {
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    },
    getTotalInfo : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info order by (meaning_game + photo_game + blank_game + listening_game) desc`;
        
        let member;
        try {
            member = await con.execute(sql);
        } catch(err) {
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    }
};

module.exports = {views};