const path = require("path");
const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.post(
  "/add-product",
  [
    body(
      "title",
      "Please enter a valid string title and at least 3 characters long."
    )
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl").isURL().withMessage("Please enter a valid image URL."),
    body("price").isFloat().withMessage("Please enter a valid float price"),
    body(
      "description",
      "Description length must be between 5 and 400 characters."
    )
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body(
      "title",
      "Please enter a valid string title and at least 3 characters long."
    )
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl").isURL().withMessage("Please enter a valid image URL."),
    body("price").isFloat().withMessage("Please enter a valid float price"),
    body(
      "description",
      "Description length must be between 5 and 400 characters."
    )
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
