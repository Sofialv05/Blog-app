const { Category } = require("../models");

module.exports = class CategoryController {
  static async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const createdCategory = await Category.create({ name });
      res.status(201).json(createdCategory);
    } catch (err) {
      next(err);
    }
  }

  static async findAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryById(req, res, next) {
    const { name } = req.body;
    const { categoryId } = req.params;
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw { name: "NotFound", message: "Category not found" };
      }
      const updatedCategory = await category.update({ name });
      res.status(200).json(updatedCategory);
    } catch (err) {
      next(err);
    }
  }
};
