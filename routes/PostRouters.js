const router = require("express").Router();
const PostController = require("../controllers/PostController");
const authorization = require("../middlewares/authorization");

router.get("/", PostController.findAllPosts); //done

router.post("/", PostController.createPost); //done

router.get("/:postId", PostController.findPostById); //done

router.put("/:postId", authorization, PostController.updatePostById); //done

router.delete("/:postId", authorization, PostController.deletePostById); //done

module.exports = router;
