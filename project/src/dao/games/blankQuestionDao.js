const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

// 게임 뷰
const speakQuestion = {
    startGame : async (body, session) => {
        
    }
}

// 설정 뷰
const gameConfig = {
    getLevel : async () => {
        
    }
}

// Admin list View
const gameCrud = {
    getList : async (start, end) => {
        
    }
}

// admin language CRUD

const languageCrud = {
    getMaxId : async () => {
        
    }
}

const levelCrud = {
    getMaxId : async () => {
        
    }
}

const wordCrud = {
    getWordList : async (start, end) => {
        
    }
}

module.exports = {speakQuestion, gameConfig, gameCrud, languageCrud, levelCrud, wordCrud};