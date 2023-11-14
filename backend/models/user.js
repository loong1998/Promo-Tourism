const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema({
  username: { type:String , requried : true},
  contactNumber: { type:String , requried : true},
  email: { type:String , requried : true},
  userType: { type:String , requried : true},
  merchantName: { type:String , requried : true},
  companyDescription: { type:String , requried : true},
  password: { type:String , requried : true},
  pdfFile: { type:String , requried : true},
  status: { type:String , requried : true},
  expanded: { type:String , requried : true},
  merchantID: { type:String , requried : true}
});

module.exports = mongoose.model('User', postSchema, 'users');