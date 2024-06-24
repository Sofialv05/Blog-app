const { Category, User, Post } = require("../models");
module.exports = class PostController {
  static async findAllPosts(req, res) {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createPost(req, res) {
    try {
      console.log(req.body);
      await Post.create(req.body);
      res
        .status(201)
        .json({ message: `Post with the tile ${req.body.title} published` });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
