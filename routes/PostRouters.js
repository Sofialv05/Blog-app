const router = require("express").Router();
const PostController = require("../controllers/PostController");
const { authorization } = require("../middlewares/authorization");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", PostController.findAllPosts); //done

router.post("/", PostController.createPost); //done

router.get("/:postId", PostController.findPostById); //done

router.put("/:postId", authorization, PostController.updatePostById); //done

router.patch(
  "/:postId/img",
  authorization,
  upload.single("image"),
  PostController.patchImgPostById
); //done

router.delete("/:postId", authorization, PostController.deletePostById); //done

module.exports = router;
