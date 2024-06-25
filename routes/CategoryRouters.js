const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.findAllCategories); //7 done

router.post("/", CategoryController.createCategory); //6 done

router.put("/:categoryId", CategoryController.updateCategoryById); //8 done

router.delete("/:categoryId", CategoryController.deleteCategoryById); //9 done

module.exports = router;
