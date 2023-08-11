const router = require("express").Router();
const multer = require("multer");
const game1Ctrl = require("../../controller/games/game1Controller");

const stg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/game1_files");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const f_Filter = (req, file, cb) => {
  console.log("===filter===");
  const type = file.mimetype.split("/")[0];
  console.log("type: ", type);
  if (type === "image") {
    cb(null, true);
  } else {
    req.fildValication = "이미지만 저장하세요!";
    cb(null, false);
  }

}

const upload = multer({ storage: stg, fileFilter: f_Filter });

router.get("/", game1Ctrl.views.index);
router.get("/list", game1Ctrl.views.list);

router.get("/start", game1Ctrl.views.start); // level 없이
router.get("/next", game1Ctrl.views.next);

router.post("/checkAnswer", game1Ctrl.process.verify);
router.post("/start", game1Ctrl.views.start); // level 있이 시작! 

// TODO: admin

router.get("/register", game1Ctrl.views.register);
router.get("/updateForm", game1Ctrl.views.updateForm);

router.post("/register", upload.single("image"), game1Ctrl.process.register);
router.post("/deleteRecord", game1Ctrl.process.delete);
router.post("/modify", game1Ctrl.process.modify);

module.exports = router;