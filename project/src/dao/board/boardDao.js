const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");


oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;


const views = {

  getBoardPassById : async (id) => {
    let con;
    try {
      const sql = `select * from board where board_id = ${id}`;
      con = await oracledb.getConnection(dbConfig);
      const result = await con.execute(sql);
      return result.rows;

    } catch (err) {
      console.error(err);
      throw err;

    } finally {
      if (con) {
        try {
          await con.close();
        } catch (error) {
          console.error("connection 닫기:", error);
        }
      }
    }
  },

  list: async () => {
    let con;
    try {
      const sql = `select * from board order by new_date desc`;
      con = await oracledb.getConnection(dbConfig);
      const result = await con.execute(sql);
      return result.rows;

    } catch (err) {
      console.error(err);
      throw err;

    } finally {
      if (con) {
        try {
          await con.close();
        } catch (error) {
          console.error("connection 닫기:", error);
        }
      }
    }
  },

  detail: async (boardId) => {
    let con;
    try {
      const sql = `select * from board where board_id = ${boardId}`;
      con = await oracledb.getConnection(dbConfig);
      const result = await con.execute(sql);
      return result.rows;
    } catch (error) {
      console.error("Error in daoList:", error);
      throw error;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (error) {
          console.error("Connection close error", error);
        }
      }
    }
  },

}

const commentViews = {
  getList : async (boardId) => {
    let con;
    try {
      const sql = `select * from comments where board_id = ${boardId} order by comment_date desc`;
      con = await oracledb.getConnection(dbConfig);
      const result = await con.execute(sql);
      return result.rows;

    } catch (err) {
      console.error(err);
      throw err;

    } finally {
      if (con) {
        try {
          await con.close();
        } catch (error) {
          console.error("connection 닫기:", error);
        }
      }
    }
  }

}


const process = {
  insert : async (data) =>{
    let title = data.title;
    let content = data.content;
    let author = (data.author === '') ? '익명' : data.author;
    console.log("author? ", author);
    console.log("data", data);
    let password = data.password;
    let con;
    try {
    const sql = `
      INSERT INTO board (BOARD_ID, TITLE, CONTENT, AUTHOR, CREATE_DATE, new_date, password)
      VALUES (BOARD_ID_SEQ.nextval, '${title}', '${content}', '${author}', SYSTIMESTAMP, SYSTIMESTAMP, '${password}')
    `;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    return result;

  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}},

  modify : async (data) =>{
    let id = parseInt(data.id); let title = data.title; let content = data.content;
    let con;
    try {
    const sql = `
      update board set title = '${title}', content = '${content}', modification_date = SYSTIMESTAMP, new_date = SYSTIMESTAMP where board_id =${id}`;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    console.log("result?", result);
    return result;

  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}},    


  updateCount: async (ID) =>{
    let id = parseInt(ID);
    let con;
    try {
    const sql = `update board set views = views + 1 where board_id = ${id}`;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    console.log("result?", result);
    return result;

  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}},      


  remove : async (ID) => {
    let id = parseInt(ID);
    let con;
    try {
    const sql = `delete board where board_id = ${id}`;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    console.log("result?", result);
    return result;
  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}}
}      


const commentProcess = {
  insert : async (data, boardId) => {
    let comment = data;
    let id = parseInt(boardId);

    let con;
    try {
    const sql = `
    insert into comments (comment_id, board_id, comment_text, comment_author, comment_date)
    VALUES (comment_id_seq.nextval, ${id}, '${comment}', 'test', SYSTIMESTAMP)
  `;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    return result;
  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}},


  remove : async (commentId) => {
    let cId = parseInt(commentId);
    try {
    const sql = `
    delete from comments where comment_id = ${cId} 
  `;
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(sql);
    return result;
  } catch (error) {
    console.error("Error in insert:", error);
    throw error;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.err(err);}}}},      


}
module.exports = { views, commentViews, process, commentProcess };
