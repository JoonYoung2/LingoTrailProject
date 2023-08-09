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

    return result.rows;
  }
}

const insert = async (data) => {
  let con = await oracledb.getConnection(dbConfig);
  const sql = `
    INSERT INTO MATCH_PICTURE_GAME (record_id, create_date, question, question_level, img, answer, wrong1, wrong2, wrong3
    ) VALUES ( match_picture_game_seq.NEXTVAL, CURRENT_TIMESTAMP, :question, :question_level, :img, :answer, :wrong1, :wrong2, :wrong3)`;

  const bindParams = {
    question: data.question,
    question_level: parseInt(data.question_level),
    img: data.img,
    answer: data.answer,
    wrong1: data.wrong1,
    wrong2: data.wrong2,
    wrong3: data.wrong3
  };

  try {
    const result = await con.execute(sql, bindParams);
    console.log("dao insert: ", result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, insert };
