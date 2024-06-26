const router = require("express").Router();
const postRouters = require("./PostRouters");
const categoryRouters = require("./CategoryRouters");
const pubRouters = require("./PubRouters");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.use("/pub", pubRouters);

router.post("/add-user", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

//--------main entity
router.use("/posts", postRouters);

//--------support entity
router.use("/categories", categoryRouters);

//------public

router.use(errorHandler);

module.exports = router;
