const moment = require("moment");
const transporter = require("../../common/transporter");
const ejs = require("ejs");
const path = require("path");

const paginate = require("../../common/paginate");
const CategoryModel = require("../models/categories_model");
const CommentModel = require("../models/comments_model");
const ProductModel = require("../models/products_model");

const index = async (req, res) => {
    //Featured Products
    const featuredProducts = await ProductModel.find({
        featured: true,
        is_stock: true,
    })
        .sort({ _id: -1 })
        .limit(9);

    const lastestProducts = await ProductModel.find({
        is_stock: true,
    })
        .sort({ _id: -1 })
        .limit(9);

    res.render("site", { featuredProducts, lastestProducts });
};

const category = async (req, res) => {
    const id = req.params.id;
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRow = await ProductModel.find({ cat_id: id }).countDocuments();
    const totalPage = Math.ceil(totalRow / limit);

    const products = await ProductModel.find({ cat_id: id })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);

    const total = totalRow;
    const category = await CategoryModel.findById(id);

    res.render("site/category", {
        products,
        total,
        category,
        pages: paginate(page, totalPage),
        page,
        totalPage,
    });
};

const product = async (req, res) => {
    const id = req.params.id;
    const limit = 1;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRow = await CommentModel.find({ prd_id: id }).countDocuments();
    const totalPage = Math.ceil(totalRow / limit);

    const product = await ProductModel.findById(id).sort({ _id: -1 });

    const comments = await CommentModel.find({ prd_id: id })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);

    res.render("site/product", {
        product,
        comments,
        moment,
        pages: paginate(page, totalPage),
        page,
        totalPage,
    });
};

const comment = async (req, res) => {
    const id = req.params.id;
    const { full_name, email, body } = req.body;
    const comment = {
        full_name,
        email,
        body,
        prd_id: id,
    };

    await new CommentModel(comment).save();
    res.redirect(req.path);
};

const search = async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const keyword = req.query.keyword || "";
    const filter = {};
    if (keyword) {
        filter.$text = {
            $search: keyword,
        };
    } else {
        filter.$text = {
            $search: "",
        };
    }
    const totalRow = await ProductModel.find(filter).countDocuments();
    const totalPage = Math.ceil(totalRow / limit);

    const products = await ProductModel.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });

    res.render("site/search", {
        products,
        pages: paginate(page, totalPage),
        page,
        totalPage,
        keyword,
    });
};

const addToCart = async (req, res) => {
    const { id, qty } = req.body;
    let cart = req.session.cart;
    let isProductExist = false;

    cart.map((item) => {
        if (item.id === id) {
            item.qty += parseInt(qty);
            isProductExist = true;
        }
        return item;
    });

    if (!isProductExist) {
        const product = await ProductModel.findById(id);
        cart.push({
            id,
            name: product.name,
            price: product.price,
            img: product.thumbnail,
            qty: parseInt(qty),
        });
    }
    req.session.cart = cart;
    res.redirect("/cart");
};

const cart = (req, res) => {
    let cart = req.session.cart;
    res.render("site/cart", { cart });
};

const updateCart = (req, res) => {
    const { products } = req.body;
    let cart = req.session.cart;
    cart.map((item) => {
        return (item.qty = parseInt(products[item.id]["qty"]));
    });

    req.session.cart = cart;
    res.redirect("/cart");
};

const delCart = (req, res) => {
    const id = req.params.id;
    let cart = req.session.cart;
    const newCart = cart.filter((item) => {
        return item.id != id;
    });
    req.session.cart = newCart;
    res.redirect("/cart");
};

const order = async (req, res) => {
    const { name, mail, phone, add } = req.body;
    const items = req.session.cart;

    const html = await ejs.renderFile(
        path.join(req.app.get("views"), "site/email-order.ejs"),
        {
            name,
            mail,
            phone,
            add,
            items
        });

    await transporter.sendMail({
        to: mail,
        from: "mobile shop",
        subject: "Xác nhận đơn hàng",
        html,
    });

    req.session.cart = [];
    res.redirect("/success")
};

const success = (req, res) => {
    res.render("site/success");
};

module.exports = {
    index,
    category,
    addToCart,
    cart,
    updateCart,
    delCart,
    product,
    comment,
    search,
    order,
    success,
};
