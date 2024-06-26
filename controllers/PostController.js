const { Post, User } = require("../models");
module.exports = class PostController {
  static async findAllPosts(req, res, next) {
    //done
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          as: "Author",
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(200).json(posts);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async createPost(req, res, next) {
    //done
    const { title, content, imgUrl, CategoryId } = req.body;
    try {
      //   console.log(req.body);
      const createdPost = await Post.create({
        title,
        content,
        imgUrl,
        CategoryId,
      });
      res.status(201).json(createdPost);
    } catch (err) {
      next(err);
    }
  }

  static async findPostById(req, res, next) {
    //done
    const { postId } = req.params;
    try {
      //   console.log(req.body);
      const post = await Post.findByPk(postId);
      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
      } else {
        res.status(200).json(post);
      }
    } catch (err) {
      next(err);
    }
  }

  static async updatePostById(req, res, next) {
    //done
    const { title, content, imgUrl, CategoryId } = req.body;
    const { postId } = req.params;
    try {
      //   console.log(req.body);
      const post = await Post.findByPk(postId);
      console.log(post);
      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
      } else {
        const updatedPost = await post.update({
          title,
          content,
          imgUrl,
          CategoryId,
        });
        res.status(200).json(updatedPost);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletePostById(req, res, next) {
    //done
    const { postId } = req.params;
    try {
      //   console.log(req.body);
      const deletePost = await Post.destroy({
        where: {
          id: +postId,
        },
      });

      if (!deletePost) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
      } else {
        res
          .status(200)
          .json({ message: `Success deleting post with id ${postId}` });
      }
    } catch (err) {
      next(err);
    }
  }
};
