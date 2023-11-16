const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: {type: String, require: true},
  tourTitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  descriptions: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  username: { type: String, required: true } // Add the username field
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
