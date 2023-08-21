const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const views = {   
    getScoreInfo : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info`;
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
        const sql = `select * from member_info order by game1_score desc`;
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
        const sql = `select * from member_info order by game2_score desc`;
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
        const sql = `select * from member_info order by game3_score desc`;
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
        const sql = `select * from member_info order by (game1_score+game2_score+game3_score) desc`;
        let member;
        try{
            member = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log("member : ", member.rows);
        return member.rows;
    }
};

module.exports = {views};