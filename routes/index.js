const router = require("express").Router();
const postRouters = require("./PostRouters");
const categoryRouters = require("./CategoryRouters");

router.get("/", (req, res) => {
  res.redirect("/Posts");
});

router.use("/posts", postRouters);

//--------support entity
router.use("/categories", categoryRouters);

module.exports = router;
