const UserModel = require("../models/users_model");

const getLogin = (req, res) => {
    res.render("admin/login", { data: {} });
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    let error = null;
    const users = await UserModel.find({ email, password });
    req.session.email = email;
    req.session.password = password;
    if (users.length > 0) {
        res.redirect("/admin/dashboard");
    }

    else if (email === "" || password === "") {
        error = "Vui lòng không để trống";
    }

    else {
        error = "Sai tài khoản hoặc mật khẩu";
    }

    res.render("admin/login", { data: { error } });
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
};

module.exports = {
    getLogin,
    postLogin,
    logout
};