const slug = require("slug");
const paginate = require("../../common/paginate");
const CategoryModel = require("../models/categories_model");


const index = async (req, res) => {
  const limit = 1;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRow = await CategoryModel.find().countDocuments();
  const totalPage = Math.ceil(totalRow / limit);

  const categories = await CategoryModel.find().limit(limit).skip(skip).sort({ _id: -1 });

  res.render("admin/categories/category", {
    categories,
    pages: paginate(page, totalPage),
    page,
    totalPage,
  });
};

const create = (req, res) => {
  res.render("admin/categories/add_category", { data: {} });
};

const store = async (req, res) => {
  const { title } = req.body;
  const categories = (await CategoryModel.find({ title })).length;
  let error = null;

  if (categories > 0) {
    error = "Danh mục đã tồn tại";
  }

  else {
    const category = {
      title,
      slug: slug(title),
    };

    new CategoryModel(category).save();
    res.redirect("/admin/categories");
  }

  res.render("admin/categories/add_category", { data: { error } });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const category = await CategoryModel.findById(id);

  res.render("admin/categories/edit_category", { category, data: {} });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const category = await CategoryModel.findById(id);
  const categories = (await CategoryModel.find({ title })).length;
  let error = null;

  if (categories > 0) {
    error = "Danh mục đã tồn tại";
  }

  else {
    const NewCategory = {
      title,
      slug: slug(title)
    };

    await CategoryModel.updateOne({ _id: id }, { $set: NewCategory });

    res.redirect("/admin/categories");
  }

  res.render("admin/categories/edit_category", { category, data: { error } });
};

const del = async (req, res) => {
  const id = req.params.id;
  await CategoryModel.deleteOne({ _id: id });

  res.redirect("/admin/categories");
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del
};