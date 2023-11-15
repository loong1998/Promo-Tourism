const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    creditCardNum: {type: String, require: true},
    expDate: {type: String, require: true},
    cvv: {type: String, require: true},
    bookingID: {type: String, require: true},
    productID: {type: String, require: true},
    tourTitle: {type: String, require: true},
    totalPrice: {type: Number, require: true},
    username: {type: String, require: true},
})

module.exports = mongoose.model('Payment', paymentSchema);