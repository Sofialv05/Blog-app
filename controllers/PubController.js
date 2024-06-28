const { Post } = require("../models");
const { Op } = require("sequelize");

module.exports = class PubController {
  static async getAllPosts(req, res, next) {
    const { filter, sort, page, keyword } = req.query;
    try {
      let options = {};
      if (keyword) {
        options.where = { title: { [Op.iLike]: `%${keyword}%` } };
      }

      if (filter) {
        if (options.where) {
          options.where.CategoryId = filter;
        } else {
          options.where = { CategoryId: filter };
        }
      }

      if (sort) {
        const orderBy = sort[0] === "-" ? "DESC" : "ASC";
        const column = orderBy === "DESC" ? sort.slice(1) : sort;
        options.order = [[column, orderBy]];
      }

      let limit = 10;
      let pageNumber = 1;

      if (page) {
        if (page.size) {
          limit = page.size;
          options.limit = limit;
        }

        if (page.number) {
          pageNumber = page.number;
          options.offset = limit * (pageNumber - 1);
        }
      }

      const { count, rows } = await Post.findAndCountAll(options);
      res.status(200).json({
        page: +pageNumber,
        data: rows,
        totalData: +count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: +limit,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      console.log(post);
      if (!post) throw { name: "NotFound", message: "Post not found" };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
};
