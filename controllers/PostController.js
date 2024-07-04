const { Post, User } = require("../models");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = class PostController {
  static async findAllPosts(req, res, next) {
    const role = req.user.role;
    const AuthorId = req.user.id;
    try {
      let posts = await Post.findAll({
        include: {
          model: User,
          as: "Author",
          attributes: {
            exclude: ["password"],
          },
        },
      });

      if (role !== "Admin") {
        posts = posts.filter((post) => post.AuthorId == AuthorId);
      }
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    const AuthorId = req.user.id;
    const { title, content, imgUrl, CategoryId } = req.body;
    try {
      const createdPost = await Post.create({
        title,
        content,
        imgUrl,
        CategoryId,
        AuthorId,
      });
      res.status(201).json(createdPost);
    } catch (err) {
      next(err);
    }
  }

  static async findPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      if (!post) throw { name: "NotFound", message: "Post not found" };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async updatePostById(req, res, next) {
    const { title, content, imgUrl, CategoryId } = req.body;
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      await post.update({
        title,
        content,
        imgUrl,
        CategoryId,
      });
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async patchImgPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      const base64 = req.file.buffer.toString("base64");

      const base64url = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(base64url);

      await post.update({
        imgUrl: result.secure_url,
      });
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async deletePostById(req, res, next) {
    const { postId } = req.params;
    try {
      await Post.destroy({
        where: {
          id: +postId,
        },
      });

      res
        .status(200)
        .json({ message: `Success deleting post with id ${postId}` });
    } catch (err) {
      next(err);
    }
  }
};
