const router = require("express").Router();
const postRouters = require("./PostRouters");
const categoryRouters = require("./CategoryRouters");
const pubRouters = require("./PubRouters");
const UserController = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.redirect("/Posts");
});

//--------main entity
router.use("/posts", postRouters);

//--------support entity
router.use("/categories", categoryRouters);

//------public
router.use("/pub", categoryRouters);

router.post("/add-user", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
