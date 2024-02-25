const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
    },
    email : {
        type: 'string',
        required: true,
    },
    password : {
        type:'string',
        required: true,
    }
});

userSchema.pre('save', function(next){
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword;

    next();
});

const User = mongoose.model('User',userSchema,'User');

module.exports = User;