const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true , trim:true},
  password: { type: String, required: true },
  type: { type: String, default:"user"},

},{
  timestamps:true
});

module.exports = mongoose.model('User', UserSchema);