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
      //backup
      req.session.currentIndex = nextIndex;

      //backup
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

  register: async (req, res) => {
    const imageFilePath = req.file.path;
    console.log("controller imageFilePath: ", imageFilePath);
    await game1Service.insert(req.body, imageFilePath);
    res.redirect("/game1/register");
  },

  verify: async (req, res) => {
    console.log("controller verify body : ", req.body);
    try {
      const recordId = req.body.record_id;
      const selectedAnswer = req.body.selected_answer;
      console.log("ctrl selec", selectedAnswer);
      const isCorrect = await game1Service.verifyAnswer(recordId, selectedAnswer);

      console.log("현재 문제의 인덱스 뭐임 :?", req.session.currentIndex);
      const currentQuestion = req.session.selectedQuestions[req.session.currentIndex];
      console.log("현재 문제 뭐임?", currentQuestion);

      if (isCorrect === 1) {
        // explain 가져오기
        const explain = currentQuestion.EXPLAIN;

        // 점수 업데이트
        const currentScore = req.session.score || 0;
        req.session.score = currentScore + 1;
        console.log("지금 점수 몇 점임?", req.session.score);
        res.render("games/game1/gamePage", { currentQuestion, explain });

      } else {
        // 오답일 때
        const explain = "오답입니다 다음 문제를 풀어보세요";
        res.render("games/game1/gamePage", { currentQuestion, explain });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = { views, process };