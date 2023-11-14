const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    productID: {type: String, require: true},
    numOfPax: {type: Number, require: true},
    contactNum: {type: String, require: true},
    visitDate: {type: Date, require: true},
    totalPrice: {type: Number, require: true},
    username: {type: String, require: true}
})

module.exports = mongoose.model('Booking', bookingSchema, 'bookings');