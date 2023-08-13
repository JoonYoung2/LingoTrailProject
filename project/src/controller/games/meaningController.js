const service = require ("../../service/games/meaningService");
const configure = {
    condition : (req, res)=>{
        res.render("games/meaning/condition.ejs");
    },
    showGames : async (req, res)=>{
        let QeAn = await service.configure.getQeAn(req.body); //QeAn means Question and Answer.
        let given = await service.configure.getGiven(req.body, QeAn); //given means given selectors.
/*
given:  [
    [ 'cat', 'snow', 'dog', 'moon', 'bread' ],
    [ 'sea', 'school', 'cat', 'moon', 'sunlight' ],
    [ 'snow', 'valley', 'wind', 'dog', 'winter' ],
    [ 'house', 'tree', 'spring', 'lake', 'fall' ],
    [ 'rain', 'ocean', 'summer', 'lake', 'winter' ],
    [ 'mountain', 'rain', 'wind', 'tree', 'lake' ],
    [ 'dog', 'snow', 'ocean', 'snowflake', 'summer' ],
    [ 'snowflake', 'wind', 'spring', 'rose', 'sky' ],
    [ 'sky', 'wind', 'winter', 'lake', 'water' ],
    [ 'rose', 'moon', 'fall', 'school', 'snow' ]
  ]
  */
        res.render("games/meaning/show", {QeAn, given});
            /*
  QeAn:  [
  { QUESTION: '획기적인', ANSWER: 'revolutionary' },
  { QUESTION: '섬세한', ANSWER: 'delicate' },
  { QUESTION: '어려운', ANSWER: 'challenging' },
  { QUESTION: '난해한', ANSWER: 'puzzling' },
  { QUESTION: '난치한', ANSWER: 'formidable' },
  { QUESTION: '정교한', ANSWER: 'sophisticated' },
  { QUESTION: '휴대폰', ANSWER: 'mobile phone' },
  { QUESTION: '자신감 있는', ANSWER: 'confident' },
  { QUESTION: '매혹적인', ANSWER: 'captivating' },
  { QUESTION: '엄청난', ANSWER: 'tremendous' }
]
            답 가져오기
            고르는 타일 가져오기. (답, 틀린답 섞인)
            '1'
            */
        
    }

}

const meaningCrud = {
    getList : (req, res) => {

    }
}
module.exports={configure, meaningCrud};