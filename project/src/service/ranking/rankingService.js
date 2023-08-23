const session = require("express-session");
const dao = require("../../dao/ranking/rankingDAO");

const views = {  
    getScore : async (id) => {
        let list = dao.views.getScoreInfo(id);
        
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    },
    getGame01 : async () => {
        let list = dao.views.getGame01Info();
        
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    },
    getGame02 : async () => {
        let list = dao.views.getGame02Info();
        
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    },
    getGame03 : async () => {
        let list = dao.views.getGame03Info();
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    },
    getGame04 : async () => {
        let list = dao.views.getGame04Info();
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    },
    getTotal : async () => {
        let list = await dao.views.getTotalInfo();
        console.log("service : ");
        for(var i=0; i<list.length; i++) {
            console.log(list[i]);
        }
        
        return list;
    }
};

const process = {

};

module.exports = {views, process};