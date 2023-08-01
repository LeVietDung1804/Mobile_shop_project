const paginate = require("../../common/paginate");
const UserModel = require("../models/users_model");

const index = async (req, res) => {
  const limit = 1;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRow = await UserModel.find().countDocuments();
  const totalPage = Math.ceil(totalRow / limit);

  const users = await UserModel.find().limit(limit).skip(skip).sort({ _id: -1 });

  res.render("admin/users/user", {
    users,
    pages: paginate(page, totalPage),
    page,
    totalPage,
  });
};

const create = (req, res) => {
  res.render("admin/users/add_user", { data: {} });
};

const store = async (req, res) => {
  const { full_name, email, password, checkPassword, role } = req.body;
  let error = null;
  const users = (await UserModel.find({ email })).length;

  if (users > 0) {
    error = "Email đã tồn tại";
  }

  else if (users == 0 && password != checkPassword) {
    error = "Mật khẩu nhập lại chưa chính xác";
  }

  else {
    const user = {
      full_name,
      email,
      password,
      role,
    };

    await UserModel(user).save();
    res.redirect("/admin/users");
  }

  res.render("admin/users/add_user", { data: { error } });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  res.render("admin/users/edit_user", { user, data: {} });

};

const update = async (req, res) => {
  const id = req.params.id;
  const { full_name, password, checkPassword, email, role } = req.body;
  const user = await UserModel.findById(id);
  const users = (await UserModel.find({ email })).length;

  let error = null;
  if (users > 0) {
    error = "Email đã tồn tại";
  }
  else {
    const newUser = {
      full_name,
      password,
      checkPassword,
      email,
      role
    };
    await UserModel.updateOne({ _id: id }, { $set: newUser });
    res.redirect("/admin/users");
  }

  res.render("admin/users/edit_user", { user, data: { error } });

};

const del = async (req, res) => {
  const id = req.params.id;
  await UserModel.deleteOne({ _id: id });
  res.redirect("/admin/users");
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del
};