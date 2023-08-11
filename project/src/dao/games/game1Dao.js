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
    const deleteArray = Array.isArray(deleteList) ? deleteList : [deleteList];

    // TODO: 제일 편한 쿼리 같다
    // deleteArray = [ '1', '2', '3' ] 이러한 방식으로 들어온다
    // deleteArray.join () 매개변수 하나 받는다
    // 그러면 그 매개변수를 이용해 하나의 문자열로 배열이 합쳐진다
    // ✨ ['1', '2', '3']   === >    1, 2, 3
    // sql = ~~~ where record_id in (1, 2, 3);
    const sql = `DELETE FROM MATCH_PICTURE_GAME 
                 WHERE RECORD_ID IN (${deleteArray.join(', ')})`;
    
    const result = await con.execute(sql);
    console.log("Deleted records: ", result.rowsAffected);
    return result.rowsAffected;

  } catch (error) {
    console.error(error);
  } 
};


module.exports = { get, insert, deleteRecord };
