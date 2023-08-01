const slug = require("slug");
const fs = require("fs");
const path = require("path");

const paginate = require("../../common/paginate");
const CategoryModel = require("../models/categories_model");
const ProductModel = require("../models/products_model");

const index = async (req, res) => {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRow = await ProductModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow / limit);

    const products = await ProductModel.find()
        .populate({ path: "cat_id" })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);

    res.render("admin/products/product", {
        products,
        pages: paginate(page, totalPage),
        page,
        totalPage,
    });
};

const create = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("admin/products/add_product", { categories });
};

const store = (req, res) => {
    const { file, body } = req;
    const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured == "on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name)
    };

    if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product.thumbnail = thumbnail;
        new ProductModel(product).save();
        res.redirect("/admin/products");
    }

};


const edit = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const categories = await CategoryModel.find();
    res.render("admin/products/edit_product", { product, categories });
};

const update = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured == "on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name)
    };

    if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product.thumbnail = thumbnail;
    }

    await ProductModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/products");
};

const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({ _id: id });
    res.redirect("/admin/products");
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
};