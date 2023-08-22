const dao = require("../../dao/board/boardDao");
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};

const toSysdate = date => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const timeDifference = currentDate - inputDate;
  
  const secondsDifference = Math.floor(timeDifference / 1000); // 그냥 밀리초단위 -> 게시판에 사용하자
  if (secondsDifference < 60) { // 60초 밑이면
    return `${secondsDifference}초 전`;
  }
  const minutesDifference = Math.floor(secondsDifference / 60);
  if (minutesDifference < 60) { // 60 분 밑이면
    return `${minutesDifference}분 전`;
  }
  const hoursDifference = Math.floor(minutesDifference / 60);
  if (hoursDifference < 24) { // 24시간 밑이면
    return `${hoursDifference}시간 전`;
  }
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

const commentViews = {
  getComment : async (boardId) => {
    const list = await dao.commentViews.getList(boardId);
    const formattedList = list.map(item => {
      const formattedDate = toSysdate(item.COMMENT_DATE);
      return {
        COMMENT_ID: item.COMMENT_ID,
        COMMENT_TEXT: item.COMMENT_TEXT,
        COMMENT_AUTHOR: item.COMMENT_AUTHOR,
        COMMENT_DATE: formattedDate
      };
    });
    return formattedList;
  }
}


const process = {
  
  submit : async (data) => {
    try {
      console.log("data?", data);
      data.password = await hashPassword(data.password);
      const result = await dao.process.insert(data);
      return result.rowsAffected;
    } catch (err) {
      console.log(err);
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

  remove: async (data) => {
    try {
      const enterdPassword = data.pass; // 사용자가 입력한 비밀번호
      const dbPasswordData = await dao.views.getBoardPassById(data.id);
      
      if (dbPasswordData && dbPasswordData.length > 0) {
        const dbPassword = dbPasswordData[0].PASSWORD; // 데이터베이스에서 가져온 해시된 비밀번호
        
        const passwordsMatch = await bcrypt.compare(enterdPassword, dbPassword);
        if (passwordsMatch) {
          const result = await dao.process.remove(data.id);
          return result.rowsAffected;
        } else {
          return 2; // 비밀번호가 일치하지 않을 때
        }
      } else {
        return 0; // 해당 ID의 데이터를 찾을 수 없을 때
      }
    } catch (err) {
      console.log(err);
      throw err; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
    }
  }
};

const commentProcess = {
  submit : async (data, boardId, userId) => {
    try {
      const result = await dao.commentProcess.insert(data, boardId, userId);
      return result.rowsAffected;
    } catch (err) {
      console.err(err);
    }
  },

  remove : async (commentId) => {
    try {      
      const result = await dao.commentProcess.remove(commentId);
      return result.rowsAffected;
    } catch (err) {
      console.err(err);
    }
  }
}

module.exports = { views , commentViews, process ,commentProcess};