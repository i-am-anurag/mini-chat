const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const Role = require('../models/role');
const User = require('../models/user');
const {JWT_KEY} = require('../config/server-config');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async createUser(userdata) {
        try {
            const user = await this.userRepository.findBy({email: userdata.email});
            if(user){
                throw new Error('User already exist');
            }

            let newUser = await this.userRepository.create(userdata);

            return newUser;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({ email});
            return user;
        } catch(error) {
            throw error;
        }
    }

    async getUserById(_id) {
        try {
            const user = await this.userRepository.findBy({_id});
            return user;
        } catch (error) {
            throw error;
        }
    }
    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw new Error('Invalid Credentials');
            }
            // compare passwords
            const comparePasswords = bcrypt.compareSync(data.password,user.password);
            if(!comparePasswords) {
                throw new Error('Invalid credentials');
            }

            const token =  this.createToken(user.email);

            console.log("Token value is:",token);

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    createToken(user) {
        try {
            const token = jwt.sign({email: user},JWT_KEY,{expiresIn:'1d'});

            return token;
        } catch (error) {
            console.log(error);
            throw new Error('Error in creating token');
        }
    }
}

module.exports = UserService;