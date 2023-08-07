const service = require("../../service/games/game1Service");

const views = {
  index: (req, res) => {
    res.render("game1/game1_index");
  },

  list: async (req, res) => {
    let list = await service.getAll();
    res.send(list);

  },

};

const process = {}

module.exports = { views, process };