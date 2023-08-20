const dao = require("../../dao/games/game1Dao");
const path = require("path");


const getAll = async () => {
  const list = await dao.get.list();
  return list;
}

const deleteRecord = async (deleteList) =>{
  console.log("service's deleteList= ", deleteList);
  return await dao.deleteRecord(deleteList);
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

const modify = async (body) => {
  try
  {
    const data = {
    record_id: body.recordId,
    question: body.question,
    question_level: parseInt(body.question_level),
    answer: body.answer,
    wrong1: body.wrong1,
    wrong2: body.wrong2,
    wrong3: body.wrong3
  };
  console.log("data : ", data);
  await dao.modify(data);
  } catch (err) {
    console.log(err)
  }
  
}

const updateScore = async (userId, score) =>{
  try {
    const result = await dao.updateScore(userId, score);
    
  } catch (err) {
    console.log(err);
  }
  
}

const getHeartItem = async (userId) =>{
  try {
    const result = await dao.getHeartItem(userId);
    return result;
  } catch (err) {
    console.log(err);
  }
  
}

const updateHeart = async (userId) =>{
  try {
    await dao.updateHeart(userId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAll, insert, verifyAnswer, getRandomQuestionV3, deleteRecord, modify, updateScore, getHeartItem, updateHeart };
