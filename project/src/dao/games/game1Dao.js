const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const getAll = {

  list: async () => {
    const sql =  `select * from MATCH_PICTURE_GAME`;
    const con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    console.log("dao result : ");

    return result;
  }

}


module.exports = { getAll };
