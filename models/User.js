
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


var UserSchema = mongoose.Schema({
    "name":  { type: String, required: true },
    "username": { type: String, required: true, unique: true },
    "email": { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
    "password": { type: String, required: true },
    "url":{ type: String},
    "perfumes purchased":[{ //!need to add date purchased
        type: mongoose.Types.ObjectId,
        ref: "Perfume",
    }],
    "wishlist": [{
        type: mongoose.Types.ObjectId,
        ref: "Perfume",
    }],
    "basket": [{
        type: mongoose.Types.ObjectId,
        ref: "Perfume",
    }],

},
    {
        timestamps: true, // give info on when user account was created
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password //remove the password key from our return document. prevents password from being sent back to the client
                return ret
            },
            id: false  // makes virtual id invisable
        }
    }
);


UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const User = mongoose.model("User", UserSchema);

module.exports = User;
