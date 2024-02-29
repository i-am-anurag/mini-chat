const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.set('strictQuery', true);
const PORT = 3000;
const JWT_KEY = 'SECERET_KEY';

const connect = async()=> {
    try {
        await mongoose.connect('mongodb://localhost/mini_chat_db');
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    PORT : process.env.PORT,
    connect,
    JWT_KEY:process.env.JWT_KEY || JWT_KEY,
    URL_KEY: process.env.URL_KEY,
}