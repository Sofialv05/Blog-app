const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.findAllCategories);

router.post("/", CategoryController.createCategory);

router.put("/:categoryId", CategoryController.updateCategoryById);

module.exports = router;
