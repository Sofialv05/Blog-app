const { Post, User } = require("../models");
module.exports = class PostController {
  static async findAllPosts(req, res) {
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
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createPost(req, res) {
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
      if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
      } else if (err.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ message: err.parent.detail });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async findPostById(req, res) {
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
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updatePostById(req, res) {
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
      if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
      } else if (err.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ message: err.parent.detail });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deletePostById(req, res) {
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
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
