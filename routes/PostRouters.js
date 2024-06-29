const router = require("express").Router();
const PostController = require("../controllers/PostController");
const { authorization } = require("../middlewares/authorization");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", PostController.findAllPosts);

router.post("/", PostController.createPost);

router.get("/:postId", PostController.findPostById);

router.put("/:postId", authorization, PostController.updatePostById);

router.patch(
  "/:postId/img",
  authorization,
  upload.single("image"),
  PostController.patchImgPostById
);

router.delete("/:postId", authorization, PostController.deletePostById);

module.exports = router;
