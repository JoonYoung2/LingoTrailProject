const dao = require("../../dao/games/speakQuestionDao");

const speakQuestion = {
    startGame : async (body) => {
        let data = await dao.speakQuestion.startGame(body);

        return data;
    },

    getWord : async (data) => {
        let result = await dao.speakQuestion.getWord();
        let word = [{}];
        console.log(result);
        
        for(var i = 0; i < data.length; i++){
            if(data[i].LANGUAGE == 1){
                let answer = data[i].ANSWER; 
                for(var j = 0; j < 3; j++){
                    let randomNum = Math.floor(Math.random() * 100);
                    console.log(randomNum);
                    answer += " " + result[randomNum].ENG;
                }
                console.log(answer);
                word[i] = {random : answer};
            }else{
                let answer = data[i].ANSWER;
                for(var j = 0; j < 3; j++){
                    let randomNum = Math.floor(Math.random() * 100);
                    console.log(randomNum);
                    answer += " " + result[randomNum].KOR;
                }
                console.log(answer);
                word[i] = {random : answer};
            }
        }

        console.log("service getWord word ==> ", word);

        return word;
    }
}

const gameConfig = {
    getLevel : async () => {
        let getLevel = await dao.gameConfig.getLevel();

        return getLevel;
    },

    getLanguage : async () => {
        let getLanguage = await dao.gameConfig.getLanguage();

        return getLanguage;
    }
}

const gameCrud = {
    getList : async () => {
        let data = await dao.gameCrud.getList();
        console.log("service gameCrud data ==> ", data[0]);

        return data;
    }
}


module.exports = {speakQuestion, gameConfig, gameCrud};