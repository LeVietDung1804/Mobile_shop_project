const express = require("express");
const router = express.Router();

//Import Controller
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const UserController = require("../apps/controllers/user");
const CategoryController = require("../apps/controllers/category");
const SiteController = require("../apps/controllers/site");
const CommentManager = require("../apps/controllers/comment");

//Import Middleware
const AuthMiddleware = require("../apps/middlewares/auth_middleware");
const UploadMiddleware = require("../apps/middlewares/upload");

//Test
router.get("/admin/test", TestController.test);
router.get("/admin/test2", TestController.test2);


//Auth
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);

router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);

router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);

//Dashboard
router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);

//Products
router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);

router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.store);

router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.update);

router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.del);

//Users
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);

router.get("/admin/users/create", AuthMiddleware.checkAdmin, UserController.create);
router.post("/admin/users/create", AuthMiddleware.checkAdmin, UserController.store);

router.get("/admin/users/edit/:id", AuthMiddleware.checkAdmin, UserController.edit);
router.post("/admin/users/edit/:id", AuthMiddleware.checkAdmin, UserController.update);


router.get("/admin/users/delete/:id", AuthMiddleware.checkAdmin, UserController.del);

//Categories
router.get("/admin/categories", AuthMiddleware.checkAdmin, CategoryController.index);

router.get("/admin/categories/create", AuthMiddleware.checkAdmin, CategoryController.create);
router.post("/admin/categories/create", AuthMiddleware.checkAdmin, CategoryController.store);

router.get("/admin/categories/edit/:id", AuthMiddleware.checkAdmin, CategoryController.edit);
router.post("/admin/categories/edit/:id", AuthMiddleware.checkAdmin, CategoryController.update);

router.get("/admin/categories/delete/:id", AuthMiddleware.checkAdmin, CategoryController.del);

//Comments
router.get("/admin/comments", AuthMiddleware.checkAdmin, CommentManager.index);
router.get("/admin/comments/delete/:id", AuthMiddleware.checkAdmin, CommentManager.del);

//Site
router.get("/", SiteController.index);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.post("/add-to-cart", SiteController.addToCart);
router.get("/cart", SiteController.cart);
router.post("/update-cart", SiteController.updateCart);
router.get("/delete-cart-:id", SiteController.delCart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);

module.exports = router;