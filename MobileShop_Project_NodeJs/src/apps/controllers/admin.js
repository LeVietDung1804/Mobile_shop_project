const CommentModel = require("../models/comments_model");
const ProductModel = require("../models/products_model");
const UserModel = require("../models/users_model");

const index = async (req, res) => {
    const products = (await ProductModel.find()).length;
    const users = (await UserModel.find()).length;
    const comments = (await CommentModel.find()).length;

    res.render("admin/dashboard", { products, users, comments });
};

module.exports = {
    index
};