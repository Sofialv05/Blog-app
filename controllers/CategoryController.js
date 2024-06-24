const { Category } = require("../models");

module.exports = class CategoryController {
  //done
  static async createCategory(req, res) {
    try {
      const createdCategory = await Category.create(req.body);
      res.status(201).json(createdCategory);
    } catch (err) {
      if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async findAllCategories(req, res) {
    //done
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateCategoryById(req, res) {
    //done
    const { categoryId } = req.params;
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        const updatedCategory = await category.update(req.body);
        res.status(200).json(updatedCategory);
      }
    } catch (err) {
      if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deleteCategoryById(req, res) {
    //done
    const { categoryId } = req.params;
    try {
      const deleteCategory = await Category.destroy({
        where: {
          id: +categoryId,
        },
      });
      if (!deleteCategory) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json({ message: "Success deleting category" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
