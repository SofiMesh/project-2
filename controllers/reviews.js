// const ArticleModel = require('../models/article');

// module.export = {
//     create, 
//     delete: deleteReview
// }

// async function deleteReview(req, res, next) {
//     try {
//         const articleDoc = await ArticleModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});
//         if(!articleDoc) return res.redirect('/articles')
//         movieDoc. reviews.remove(req.params.id)
//         await articleDoc.save();
//         res.redirect('/articles/${articleDoc._id');
//     } catch(err) {
//         next(err)
//     }
// }