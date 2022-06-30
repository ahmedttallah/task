const router = require("express").Router();
const { def, addUser, auth } = require("../controllers");
const { addValidation } = require("../controllers/validator");

router.get("/", def);

// @Route POST /adduser
// @desc Create new User
router.post("/adduser", addValidation, addUser);

// @Route POST /adduser
// @desc Create new User
router.post("/auth", auth);

module.exports = router;
