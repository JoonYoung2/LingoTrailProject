const game1Service = require("../../service/games/game1Service");

const views = {
  index: (req, res) => {
    res.render("games/game1/game1_index");
  },

  list: async (req, res) => {
    let list = await game1Service.getAll();
    
    res.render("games/game1/game1_index", { list : list });
  },

  register: (req, res) =>{
    res.render("admin/games/game1/game1_register_form");
  },

  updateForm : async (req, res)=>{
    let list = await game1Service.getAll();
    let msg = undefined;
    res.render("admin/games/game1/game1_update_form", { list : list, msg : msg });
  },

  // TODO: V3
  start: async (req, res) => {
    try {
      const totalQuetions = 5;
      const selectedQuestions = [];
      while (selectedQuestions.length < totalQuetions) {
        const randomGame = await game1Service.getRandomQuestionV3(req.body.level);
        if (!selectedQuestions.some(question => question.RECORD_ID === randomGame.RECORD_ID)) {
          selectedQuestions.push(randomGame);                                                                                                                                                                                         
        }
      }
      console.log("cont, 받아온 5개의 문제: ", selectedQuestions);
      req.session.selectedQuestions = selectedQuestions;
      req.session.score = 0;
      const currentQuestion = selectedQuestions[0];
      const nextIndex = 0;
      req.session.currentIndex = nextIndex;

      const selectedAnswer = req.body.selected_answer; // selected_answer 추가
      const explain = undefined;
      res.render("games/game1/gamePage", { currentQuestion, nextIndex, explain, selectedAnswer });
      console.log("currentQuestion : ctrl", currentQuestion);
      console.log("nextIndex : ctrl", nextIndex)
      console.log("explain : ctrl", explain)
    } catch (err) {
      console.log(err);
      res.status(500).send("알 수 없는 오류 발생");
    }
  },

  next: async (req, res) => {
    try {
      const selectedQuestions = req.session.selectedQuestions;
      const currentIndex = req.session.currentIndex + 1 || 0;

      if (currentIndex >= selectedQuestions.length) {
        req.session.selectedQuestions = undefined;
        req.session.currentIndex = undefined;

        const score = req.session.score || 0;
        
        res.send(
          `모든 문제를 다 풀었어요! 당신의 점수는 ${score}점입니다.` +
          "<br><br><br><a href='/game1/list'>돌아가기</a>"
        );
        req.session.score = 0;
        return;
      }
      const currentQuestion = selectedQuestions[currentIndex];
      const nextIndex = currentIndex;
      req.session.currentIndex = nextIndex;

      //backup
      const explain = undefined;
      const selectedAnswer = req.body.selected_answer; // selected_answer 추가
      

      res.render("games/game1/gamePage", { currentQuestion, nextIndex, explain, selectedAnswer })
    } catch (err) {
      console.log(err);
      res.status(500).send("알 수 없는 오류 발생")
    }
  }
}

const process = {

  modify: async (req, res) => {
    try {
      await game1Service.modify(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  },
  delete: async (req, res)=>{
    console.log("req.body.delete_checkbox > : ",req.body.delete_checkbox);
    const deleteList =  req.body.delete_checkbox;

    if (deleteList && deleteList.length > 0) {
      result = await game1Service.deleteRecord(deleteList);
      if (result !== 0) {
        let msg = `삭제되었습니다`;
        let list = await game1Service.getAll();
        res.render("admin/games/game1/game1_update_form", { list: list, msg: msg });
      }
    } else {
      let msg = `삭제하려면 체크박스를 선택하세요`;
      let list = await game1Service.getAll();
      res.render("admin/games/game1/game1_update_form", { list: list, msg: msg });
    }
  },

  register: async (req, res) => {
    const imageFilePath = req.file.path;
    console.log("controller imageFilePath: ", imageFilePath);
    await game1Service.insert(req.body, imageFilePath);
    res.redirect("/game1/register");
  },

  verify: async (req, res) => {
    try {
      const recordId = req.body.record_id;
      const selectedAnswer = req.body.selected_answer;
      const nextIndex = req.body.nextIndex;
      const isCorrect = await game1Service.verifyAnswer(recordId, selectedAnswer);

      const currentQuestion = req.session.selectedQuestions[req.session.currentIndex];

      if (isCorrect === 1) {
        const explain = currentQuestion.EXPLAIN;

        const currentScore = req.session.score || 0;
        req.session.score = currentScore + 1;
        res.render("games/game1/gamePage", { currentQuestion, explain, nextIndex });

      } else {
        // 오답일 때
        const explain = "오답입니다 다음 문제를 풀어보세요";
        res.render("games/game1/gamePage", { currentQuestion, explain, nextIndex });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = { views, process };