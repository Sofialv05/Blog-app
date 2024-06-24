const router = require("express").Router();
const PostController = require("../controllers/PostController");

router.get("/", PostController.findAllPosts); //done

router.post("/", PostController.createPost); //done

router.get("/:postId", PostController.findPostById); //done

router.put("/:postId", PostController.updatePostById); //done

router.delete("/:postId", PostController.deletePostById); //done

module.exports = router;
