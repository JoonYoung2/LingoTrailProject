const dao = require("../../dao/games/game1Dao");
const path = require("path");


const getAll = async () => {
  const list = await dao.get.list();
  return list;
}

const verifyAnswer = async (recordId, selectedAnswer) => {

  console.log("service log : >>> ", recordId, " & ", selectedAnswer);
  try {
    const isCorrect = await dao.get.checkAnswer(recordId, selectedAnswer);
    return isCorrect;

  } catch (err) {
    console.log(err)
    return null;
  }
}

const getRandomQuestionV3 = async (reqLevel) => {
  try {
    console.log("service's level: ", reqLevel);
    const randomGame = await dao.get.getRandomQuestionV3(reqLevel);
    return randomGame;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const insert = async (body, imageFilePath) => {
  console.log("service path", imageFilePath);
  const imageName = path.basename(imageFilePath);
  console.log("service imageName", imageName);

  try {
    const data = {
      question: body.question,
      question_level: parseInt(body.level),
      img: imageName,
      answer: body.answer,
      wrong1: body.wrong1,
      wrong2: body.wrong2,
      wrong3: body.wrong3,
      explain: body.explain
    };

    console.log("service", data);
    await dao.insert(data);

  } catch (err) {

    console.log(err);
  }
};

module.exports = { getAll, insert, verifyAnswer, getRandomQuestionV3 };
