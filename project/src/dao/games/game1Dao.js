const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const get = {

  list: async () => {
    const sql = `SELECT * FROM MATCH_PICTURE_GAME`;
    const con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    console.log("dao result : ");

    return result.rows;
  },

  getRandomQuestionV3: async () => {
    try {
      const con = await oracledb.getConnection(dbConfig);
      const sql = `SELECT * FROM MATCH_PICTURE_GAME ORDER BY DBMS_RANDOM.RANDOM`;
      const result = await con.execute(sql);
      return result.rows[0];

    } catch (err) {
      console.log(err);
      return null;
    }
  },

  checkAnswer: async (recordId, selectedAnswer) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `SELECT CASE WHEN ANSWER = :selectedAnswer THEN 1 ELSE 0 END AS IS_CORRECT
    FROM MATCH_PICTURE_GAME
    WHERE RECORD_ID = :recordId`;

    const bindParams = {
      selectedAnswer: selectedAnswer,
      recordId: recordId
    };

    try {
      console.log("여기는 오나?")
      const result = await con.execute(sql, bindParams);
      const isCorrect = result.rows[0].IS_CORRECT;
      console.log(result.rows);
      console.log(result.rows[0]);
      console.log(result.rows[0].IS_CORRECT);
      return isCorrect;
    } catch (err) {
      console.log(err);
      return 0;
    }
  },
}

const insert = async (data) => {
  let con = await oracledb.getConnection(dbConfig);
  const sql = `
    INSERT INTO MATCH_PICTURE_GAME (record_id, create_date, question, question_level, img, answer, wrong1, wrong2, wrong3, explain
    ) VALUES ( match_picture_game_seq.NEXTVAL, CURRENT_TIMESTAMP, :question, :question_level, :img, :answer, :wrong1, :wrong2, :wrong3, :explain)`;

  const bindParams = {
    question: data.question,
    question_level: parseInt(data.question_level),
    img: data.img,
    answer: data.answer,
    wrong1: data.wrong1,
    wrong2: data.wrong2,
    wrong3: data.wrong3,
    explain: data.explain
  };

  try {
    const result = await con.execute(sql, bindParams);
    console.log("dao insert: ", result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { get, insert };
