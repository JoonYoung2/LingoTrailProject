const dao = require("../../dao/board/boardDao");

const toSysdate = date => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const timeDifference = currentDate - inputDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // -> 밀리초 * 초 * 분 * 시 = 하루 (단위로 내림) -> * 1.5일 >>> 1 >>> 하루전

  if (daysDifference === 0) {
    return "오늘";
  } else if (daysDifference === 1) {
    return "1일 전";
  } else if (daysDifference <= 7) {
    return `${daysDifference}일 전`;
  } else if (daysDifference <= 30) { // 8일 전 >>> 7로 나눈 몫 = 1 >>> 1주일전
    const weeksDifference = Math.floor(daysDifference / 7);
    return `${weeksDifference}주 전`;
  } else if (daysDifference <= 365) {
    const monthsDifference = Math.floor(daysDifference / 30); // 31일 전 >>> 나누면 1 >>> 1달전
    return `${monthsDifference}달 전`;
  } else {
    const yearsDifference = Math.floor(daysDifference / 365); 
    return `${yearsDifference}년 전`;
  }
};

const views = {
  getAll: async () => {
    const list = await dao.views.list();
    const formattedList = list.map(item => {
      const formattedDate = toSysdate(item.NEW_DATE);
      return {
        BOARD_ID: item.BOARD_ID,
        TITLE: item.TITLE,
        CONTENT: item.CONTENT,
        AUTHOR: item.AUTHOR,
        DATE: formattedDate,
        VIEWS: item.VIEWS,
        MODIFIED: item.MODIFIED
      };
    });
    return formattedList;
  },

  getDetail: async (detailId) => {
    const ID = parseInt(detailId);
    const list = await dao.views.detail(ID);
    await dao.process.updateCount(ID);
    
    const formattedList = list.map(item => {
      const formattedDate = toSysdate(item.MODIFICATION_DATE || item.CREATE_DATE);
      return {
        BOARD_ID: item.BOARD_ID,
        TITLE: item.TITLE,
        CONTENT: item.CONTENT,
        AUTHOR: item.AUTHOR,
        DATE: formattedDate,
        VIEWS: item.VIEWS,
        MODIFIED: item.MODIFIED
      };
    });
    console.log("formattedList",formattedList);
    return formattedList[0];
  }
};

const process = {
  
  submit : async (data) => {
    try {
      const result = await dao.process.insert(data);
      return result.rowsAffected;
    } catch (err) {
      console.err(err);
    }
  },

  modify : async (data) => {
    try {
      const result = await dao.process.modify(data);
      return result.rowsAffected;
    } catch (err) {
      console.log(err);
    }
  },

  remove: async(data) =>{
    try {
      
      const result = await dao.process.remove(data.id);
      return result.rowsAffected;
    } catch (err) {
      console.log(err);
    } 
  }
};


module.exports = { views , process };