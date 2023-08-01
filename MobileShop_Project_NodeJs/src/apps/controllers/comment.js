const paginate = require("../../common/paginate");
const CommentModel = require("../models/comments_model");

const index = async (req, res) => {
    const limit = 1;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRow = await CommentModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow / limit);

    const comments = await CommentModel.find().populate({ path: "prd_id" })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);

    res.render("admin/comments/comment", {
        comments,
        pages: paginate(page, totalPage),
        page,
        totalPage,
    });
};

const del = async (req, res) => {
    const id = req.params.id;
    await CommentModel.deleteOne({ _id: id });

    res.redirect("/admin/comments");
};

module.exports = {
    index,
    del,
};
