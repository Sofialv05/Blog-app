const PubController = require("../controllers/PubController");
const router = require("express").Router();

router.get("/posts", PubController.getAllPosts);
router.get("/categories", PubController.findAllCategories);
router.get("/posts/:postId", PubController.getPostById);

module.exports = router;
