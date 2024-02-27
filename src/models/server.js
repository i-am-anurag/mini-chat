const mongoose = require('mongoose');

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
    }
});

const Server = mongoose.model('Server',serverSchema,'Server');

module.exports = Server;