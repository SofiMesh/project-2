const ArticleModel = require("../models/article");

module.exports = {
    index,
    // show,
    // new: newArticle,
    // create
}


async function index(req, res) {
    const articles = await ArticleModel.find({});
    console.log(articles);
    res.render("articles/index", { title: "All Articles", articles: articles });
}

// async function show(req,res) {
//     // console.log(req.user)
//     try {
//     const articleFromTheDatabase = await ArticleModel
//                                         .findById(req.params.id)
//                                         // .exec();
    
//     res.render("articles/show", {
//         article: articleFromTheDatabase
//     });
// }   catch (err) {
//     res.send(err);
// }
// }


// function newArticle(req, res) {
//     res.render("articls/new", { title: "Add Article", errMsg: ""})
// }

// async function create(req, res) {
//     try {
//         const articleFromTheDatabase = await ArticleModel.create(req.body);
//         console.log(articleFromTheDatabase);
//         res.redirect(`/articles/${articleFromTheDatabase._id}`);
//     }
//     catch (err) {
//         console.log(err);
//         res.render("movies/new", { errorMsg: err.message});
//     }
// }