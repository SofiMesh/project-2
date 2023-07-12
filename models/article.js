const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String
}, {
    timestamps: true
 });


const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    created: {
        type: Date,
        defoult: function() {
            return new Date().getFullYear();
        },
        min: 2023
    },
    reviews: [reviewSchema], 
}, {
        timestamp: true
    }
);


module.exports = mongoose.model('Article', articleSchema);