const dao = require("../../dao/games/game1Dao");

const getAll  = async() =>{
  console.log("service1");

  // let list = await dao.getAll.list;
  
  const list = await dao.getAll.list();
  console.log("service2");
  
  console.log(list);


  return list;
}

const insert = async (body, imageFilePath) => {
  try {
    const data = {
      question: body.question,
      question_level: parseInt(body.level),
      img: imageFilePath,
      answer: body.answer,
      wrong1: body.wrong1,
      wrong2: body.wrong2,
      wrong3: body.wrong3
    };
    await dao.insert(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, insert };
