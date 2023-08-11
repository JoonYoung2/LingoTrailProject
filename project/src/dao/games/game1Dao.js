const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const get = {

  list: async () => {
    const sql = `SELECT * FROM MATCH_PICTURE_GAME ORDER BY QUESTION_LEVEL ASC`;
    const con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    return result.rows;
  },

  getRandomQuestionV3: async (reqLevel) => {
    if(reqLevel === undefined){
      try {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT * FROM MATCH_PICTURE_GAME ORDER BY DBMS_RANDOM.RANDOM`;
        const result = await con.execute(sql);
        return result.rows[0];
  
      } catch (err) {
        console.log(err);
        return null;
      }
    }else{
      try {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT * FROM MATCH_PICTURE_GAME WHERE QUESTION_LEVEL =${reqLevel} ORDER BY DBMS_RANDOM.RANDOM`;
        const result = await con.execute(sql);
        return result.rows[0];
  
      } catch (err) {
        console.log(err);
        return null;
      }
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
  const con = await oracledb.getConnection(dbConfig);
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

const deleteRecord = async (deleteList) => {
  const con = await oracledb.getConnection(dbConfig);

  try {
    //// 여기부터 시작 TODO 수정누르면 삭제되는 버그 수정
    console.log(deleteList);
    const deleteArray = Array.isArray(deleteList) ? deleteList : [deleteList];
    console.log("deleteArray?? 후:: ", deleteArray)
    console.log("=================")
    console.log("=================")
  
    const placeholders = deleteArray.map((_, index) => `:${index + 1}`).join(', ');
    console.log("placeholder 후 ?? :: ", placeholders)
    console.log("=================")
    console.log("=================")

    const sql = `DELETE FROM MATCH_PICTURE_GAME 
    WHERE RECORD_ID IN (${deleteArray.map(() => ':id').join(', ')})`;

const bindParams = deleteArray.map(id => parseInt(id)); // Ensure IDs are parsed as integers

const result = await con.execute(sql, bindParams);
console.log("Deleted records: ", result.rowsAffected);
return result.rowsAffected;

} catch (error) {
console.error(error);
} 
};



module.exports = { get, insert, deleteRecord };
