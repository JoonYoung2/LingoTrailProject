const dao = require("../../dao/games/meaningDao");
const configure ={
    getQeAn : async (body)=>{ //{ level: '1' }
        let result = await dao.configure.getQeAn(body.level);
        return result;
    }
}
module.exports = {configure};