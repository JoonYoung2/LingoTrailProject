const dao = require("../../dao/games/meaningDao");
const configure = {
    getQeAn : async (body)=>{ //{ level: '1' }
        let result = await dao.configure.getQeAn(body.level);
        return result;
    },

    getGiven : async (body, qna)=>{
        let getSelectors = await dao.configure.getGiven(body.level);
        let result = [];
        console.log("service getGiven qna ==> ",qna);
        console.log("service getGiven getSelectors", getSelectors);

        for(let i=0; i<qna.length; i++){
            let ranNum = Math.floor(Math.random() * getSelectors.length);
            console.log("+++++++++++++++++++++++:", ranNum);
            result[i] = qna[i];
        }






        // qna.forEach((list) => {
        //     var i = 0;
        //     result[i] = {answer : list.answer}
        // })
        return result;
    }
}
module.exports = {configure};