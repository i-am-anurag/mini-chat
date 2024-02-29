const mongoose = require('mongoose');
const crypto = require('crypto');

const {URL_KEY} = require('../config/server-config');


const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    maxUsers:{
        type: Number,
        min:1,
        max: 10, // Max number of users
        default: 1,
    },
    encryptedURL: {
        type: String,
    }
});

serverSchema.pre('save', function(next){
    const objId = this._id.toString()
    const cipher = crypto.createCipher('aes256', URL_KEY);  
    const encryptedURL = 'localhost:3000/api/server/' + cipher.update(objId, 'utf8', 'hex') + cipher.final('hex');
    this.encryptedURL = encryptedURL;
    
    next();
});

const Server = mongoose.model('Server',serverSchema,'Server');

module.exports = Server;