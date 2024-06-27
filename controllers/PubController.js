const { Post } = require("../models");

module.exports = class PubController {
  static async getAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      console.log(post);
      if (!post) throw { name: "NotFound" };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
};
