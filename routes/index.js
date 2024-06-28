const router = require("express").Router();
const postRouters = require("./PostRouters");
const categoryRouters = require("./CategoryRouters");
const pubRouters = require("./PubRouters");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const { authorizeAdmin } = require("../middlewares/authorization");

router.get("/", (req, res) => {
  res.redirect("/posts");
});
//------public
router.use("/pub", pubRouters);

router.post("/login", UserController.login);

router.use(authentication);

router.post("/add-user", authorizeAdmin, UserController.register);
//--------main entity
router.use("/posts", postRouters);

//--------support entity
router.use("/categories", categoryRouters);

module.exports = router;
