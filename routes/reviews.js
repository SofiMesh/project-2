const express = require('express')
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews')

router.post('/articles/:id/review', reviewsCtrl.create);

router.delete('/reviews/:id', reviewsCtrl.delete);

//for edit
router.put('/articles/:articleId/review/:id', reviewsCtrl.update)
router.get('/articles/:articleId/review/:id', reviewsCtrl.edit)
module.exports = router;