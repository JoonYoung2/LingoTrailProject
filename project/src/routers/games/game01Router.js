const router = require("express").Router();
const multer = require("multer");
const game1Ctrl = require("../../controller/games/game1Controller");

const stg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "game1_files");
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
router.get("/register", game1Ctrl.views.register);


router.post("/register", upload.single("image"), game1Ctrl.process.register);

module.exports = router;