const router = require("express").Router();
const postRouters = require("./PostRouters");
const categoryRouters = require("./CategoryRouters");
const UserController = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.redirect("/Posts");
});

router.use("/posts", postRouters);

//--------support entity
router.use("/categories", categoryRouters);

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
