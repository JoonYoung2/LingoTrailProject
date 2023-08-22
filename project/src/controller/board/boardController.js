const boardService = require("../../service/board/boardService");

const views = {
  list: async (req, res) => {
    let list = await boardService.views.getAll();
    res.render("board/board_index", { list : list , userId : req.session.userId });
  },

  detail: async (req, res) => {
    let list = await boardService.views.getDetail(req.params.id);
    let commentList = await boardService.commentViews.getComment(req.params.id);
    console.log("commentLisT? : ", commentList);
    res.render("board/board_detail", { boardDetail : list, comments : commentList, userId : req.session.userId, errorMessage  : '' })
  },

  writeForm: (req, res) => {
    res.render("board/board_write_form", {userId : req.session.userId});
  },

  modifyForm: async (req, res) => {
    let list = await boardService.views.getDetail(req.params.id);
    res.render("board/board_modify_form", { boardDetail : list , userId : req.session.userId, errorMessage  : ''});
  }

}

const process = {
  submit: async (req, res) => {
    console.log("controller req.body? : ", req.body)
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
      res.redirect("/board", {errorMessage  : ''});
    } else {
      res.redirect("/");
    }
  },
  
  remove : async(req, res)=>{
    console.log("delete body?", req.body);
    const deleteItem = await boardService.process.remove(req.body);
    console.log("deleteItem???" , deleteItem);
    if ( deleteItem === 1 ) {
      res.redirect("/board");
    } else if ( deleteItem === 2 ) {
      res.redirect(`/board/detail/${req.body.id}`);
    }
    else {
      res.redirect("/");
    }
  }

};

const commentProcess = {
  submit : async (req, res) => {
    console.log("req.body?:", req.body );
    console.log("req.params?:", req.params );
    
    const submitItem = await boardService.commentProcess.submit(req.body.comment, req.params.id, req.session.userId);
    if(submitItem === 1){
      res.redirect(`/board/detail/${req.params.id}`);
    } else {
      res.redirect("/");
    }
  },

  remove : async (req, res)=>{
    console.log("req.body : ? ",req.params);
    const deleteItem = await boardService.commentProcess.remove(req.params.commentId);
    if(deleteItem === 1){
      res.redirect(`/board/detail/${req.params.boardId}`);
    } else {
      res.redirect("/");
    }

  }
}




module.exports = { views, process, commentProcess };