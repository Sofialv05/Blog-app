const { Category } = require("../models");

module.exports = class CategoryController {
  //done
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
    //done
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryById(req, res, err) {
    //done
    const { name } = req.body;
    const { categoryId } = req.params;
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        const updatedCategory = await category.update({ name });
        res.status(200).json(updatedCategory);
      }
    } catch (err) {
      next(err);
    }
  }

  // static async deleteCategoryById(req, res) { // no 9
  //   //done
  //   const { categoryId } = req.params;
  //   try {
  //     const deleteCategory = await Category.destroy({
  //       where: {
  //         id: +categoryId,
  //       },
  //     });
  //     if (!deleteCategory) {
  //       res.status(404).json({ message: "Category not found" });
  //     } else {
  //       res.status(200).json({ message: "Success deleting category" });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }
};
