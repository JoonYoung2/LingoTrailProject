const game1Service = require("../../service/games/game1Service");

const views = {
  index: (req, res) => {
    res.render("games/game1/game1_index");
  },

  list: async (req, res) => {
    let list = await game1Service.getAll();
    console.log("controller list : ",list);
    res.render("games/game1/game1_index", { list : list });

  },

  register: (req, res) =>{
    res.render("admin/games/game1/game1_register_form");
  }

};

const process = {
  
  register : async (req, res)=>{
    const imageFilePath = req.file.path;
    await game1Service.insert(req.body, imageFilePath);
    res.redirect("/");
  }
  
}

module.exports = { views, process };