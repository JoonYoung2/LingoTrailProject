const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const member = {
    getMemInfo : async (id) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from member_info where id = '${id}'`;
        let member;
        try{
            member = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        console.log(member)
        return member;
    },
    registerDo : async (body)=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `INSERT INTO member_info (id, name, email, pw, login_type) VALUES(:id, :name, :email, :pw, 0)`;

        let result = 0;
        try{
            result = await con.execute(sql, body);
        }catch(err){
            console.log(err)
        }
        console.log("dao insert : ", result);
        return result.rowsAffected;
    },
    unregisterDo : async (id)=>{
        const con = await oracledb.getConnection(dbConfig);
        console.log("id==>",id);
        const sql = `DELETE FROM member_info WHERE id = '${id}'`;

        try{
            await con.execute(sql);
        }catch(err){
            console.log(err);
        }
    },
    // updateDo : async (body)=>{ //{ id: 're', name: 'sua', email: 'kim', pw: 're' }
    //     const con = await oracledb.getConnection(dbConfig);
    //     const sql = `UPDATE member_info SET name= '${body.name}', email= '${body.email}', pw= '${body.pw}' WHERE id = '${body.id}'`;

    //     let result = 0;
    //     try{
    //         result = await con.execute(sql, body);
    //     }catch(err){
    //         console.log(err)
    //     }
    //     console.log("dao update++++++++++++++ : ", result);
    //     //return result.rowsAffected;
    // }
    updateDo: async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `UPDATE member_info SET name = :name, email = :email, pw = :pw WHERE id = :id`;
        
        let result = 0;
        try {
            result = await con.execute(sql, {
                id: body.id,
                name: body.name,
                email: body.email,
                pw: body.pw
            });
        } catch (err) {
            console.log(err);
        } finally {
            await con.close();
        }
        console.log("dao update++++++++++++++ : ", result.rowsAffected);
        return result.rowsAffected;
    }
}

module.exports = {member};