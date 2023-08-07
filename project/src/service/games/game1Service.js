const dao = require("../../dao/games/game1Dao");

const getAll  = async() =>{
  console.log("service1");

  // let list = await dao.getAll.list;
  data= {};
  const list = await dao.getAll.list();

  data.list = list.rows;
  console.log("service2");
  
  console.log(data);


  return data;
}

module.exports = { getAll };
