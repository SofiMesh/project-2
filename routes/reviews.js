const express = require('express')
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews')

router.post('/articles/:id/review', reviewsCtrl.create);

router.delete('/reviews/:id', reviewsCtrl.delete);

router.put('/reviews/:id', reviewsCtrl.edit)

module.exports = router;