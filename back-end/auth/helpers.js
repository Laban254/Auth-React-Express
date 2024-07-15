// auth/helpers.js
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Use the Mongoose User model

async function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    password: hash
  });
  return await newUser.save();
}

module.exports = {
  createUser
};
