const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    maxUsers:{
        type: Number,
        default: 20,
    }
});

const Server = mongoose.model('Server',serverSchema,'Server');

module.exports = Server;