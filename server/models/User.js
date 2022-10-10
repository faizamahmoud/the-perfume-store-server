const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define your schema as normal.
var UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
});


UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

module.exports = User;
