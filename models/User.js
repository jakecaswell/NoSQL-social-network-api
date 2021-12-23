const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  // build schema here
);

// virtrual for friendCount


const User = model('User', userSchema);

module.exports = User;
