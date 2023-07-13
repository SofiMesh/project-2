const ArticleModel = require('../models/article');

module.exports = {
    create, 
    delete: deleteReview,
    edit: editReview
}

//edit reviews

async function editReview(req, res, next) {
    try {
      const articleDoc = await ArticleModel.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
      if (!articleDoc) {
        return res.redirect('/articles');
      }
      const review = articleDoc.reviews.find((review) => review._id.toString() === req.params.id);
      if (!review) {
        throw new Error('Review not found');
      }
      review.edited = true;  
      await articleDoc.save();
      res.redirect(`/articles/${articleDoc._id}`);
    } catch (err) {
      next(err);
    }
  }






// async function editReview(req, res, next) {
//     try {
//         const articleDoc = await ArticleModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});
//         if(!articleDoc) return res.redirect('/articles')
//         articleDoc. reviews.edit(req.params.id)
//         await articleDoc.save();
//         res.redirect(`/articles/${articleDoc._id}`);
//         } catch (err) {
//         next(err);
//     }
// }


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