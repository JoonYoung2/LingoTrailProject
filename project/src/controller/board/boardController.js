const boardService = require("../../service/board/boardService");

const views = {
  list: async (req, res) => {
    let list = await boardService.views.getAll();
    res.render("board/board_index", { list : list });
  },

  detail: async (req, res) => {
    let list = await boardService.views.getDetail(req.params.id);
    res.render("board/board_detail", { boardDetail : list })
  },

  writeForm: (req, res) => {
    res.render("board/board_write_form");
  },

  modifyForm: async (req, res) => {
    let list = await boardService.views.getDetail(req.params.id);
    res.render("board/board_modify_form", { boardDetail : list });
  }

}

const process = {
  submit: async (req, res) => {
    const insertItem = await boardService.process.submit(req.body);
    console.log("item???: ",insertItem)
    if ( insertItem === 1 ) {
      res.redirect("/board");
    } else {
      res.redirect("/");
    }
  },

  modify: async (req, res) => {
    console.log("controller req body? : ", req.body);
    const modifiedItem = await boardService.process.modify(req.body);
    if ( modifiedItem === 1 ) {
      // res.redirect(`/board/detail/${req.body.id}`);
      res.redirect("/board");
    } else {
      res.redirect("/");
    }
  },
  
  remove : async(req, res)=>{
    console.log("body?", req.body);
    const deleteItem = await boardService.process.remove(req.body);
    if ( deleteItem === 1 ) {
      res.redirect("/board");
    } else {
      res.redirect("/");
    }
  }

};


module.exports = { views, process };