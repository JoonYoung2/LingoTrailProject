const dao = require("../../dao/games/meaningDao");
const configure = {
    getQeAn : async (body)=>{ //{ level: '1' }
        let result = await dao.configure.getQeAn(body.level);
        return result;
    },

    getGiven : async (body, qna)=>{
        let getSelectors = await dao.configure.getGiven(body.level);
        
        console.log("service getGiven qna ==> ",qna);
        console.log("service getGiven getSelectors", getSelectors);

        function gettingMixedSelectors(i){////내가 하루종일 만든 함수임 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        let result = [];
            let j = 0;
            result.push(qna[i].ANSWER);
            while(j<4){
                let n =Math.floor(Math.random() * getSelectors.length);
                let selectedWord = getSelectors[n].ANSWER;
                if(! sameWord(selectedWord)){
                    result.push(selectedWord);
                    j++;
                }
            }
            function sameWord(selectedWord){
                return result.find((e) => (e === selectedWord));
            }
            return result;
        }

        function shuffleSelectors(array){
            const randomIndex = Math.floor(Math.random() * array.length);
            const answer = array[0];
            array[0] = array[randomIndex];
            array[randomIndex] = answer;

            return array;
        }

        let SelectorsWithAnswer=[];
        let shuffledSelectors=[];
        for(let i=0; i<qna.length; i++){ //문제 개수만큼 for문 동작.
            SelectorsWithAnswer[i]=gettingMixedSelectors(i);
            shuffledSelectors[i] = shuffleSelectors(SelectorsWithAnswer[i]);
        }
        return shuffledSelectors;
    }
}

module.exports = {configure};