const ArticleModel = require('../models/article');

module.exports = {
    create, 
    delete: deleteReview
}

async function deleteReview(req, res, next) {
    try {
        const articleDoc = await ArticleModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});
        if(!articleDoc) return res.redirect('/articles')
        articleDoc. reviews.remove(req.params.id)
        await articleDoc.save();
        res.redirect(`/articles/${articleDoc._id}`);
    } catch(err) {
        next(err)
    }
}

async function create(req, res) {
    console.log(req.body)
    try {
        const articleFromTheDb = await ArticleModel.findById(req.params.id)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
    
    articleFromTheDb.reviews.push(req.body);
    await articleFromTheDb.save();
    console.log(articleFromTheDb);
    res.redirect(`/articles/${req.params.id}`)
    } catch(err) {
        res.send(err)
    }
} 