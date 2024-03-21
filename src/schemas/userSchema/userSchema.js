const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
    },
    email: {
        type: String,
        lowercase: true,
    },
    photo: {
        type: String,
    }
}, { versionKey: false });

const UserModel = new mongoose.model('UserCollection',userSchema);
module.exports = UserModel ;