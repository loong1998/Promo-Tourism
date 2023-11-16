const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    productID: {type: String, require: true},
    review: {type: String, require: true},
})

module.exports = mongoose.model('Review', reviewSchema);