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
               throw {
                    statusCode: 403,
                    message: "User already exist"
               }
            }

            let newUser = await this.userRepository.create(userdata);

            return newUser;
        } catch (error) {
            throw {
                statusCode: error.statusCode || 500,
                message: error.message,
           }
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
                throw {
                    statusCode: 400,
                    message: "Invalid Credentials"
                }
            }
            // compare passwords
            const comparePasswords = bcrypt.compareSync(data.password,user.password);
            if(!comparePasswords) {
                throw {
                    statusCode: 400,
                    message: "Invalid Credentials"
                }
            }

            console.log("User Vale is:",user)
            const token =  this.createToken({email:user.email,id: user._id});

            console.log("Token value is:",token);

            return token;
        } catch (error) {
            throw {
                statusCode: error.statusCode || 500,
                message: error,
            }
        }
    }
    
    createToken(user) {
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn:'1d'});

            return token;
        } catch (error) {
            console.log(error);
            throw {
                statusCode: error.statusCode || 500,
                message: "Something Went wrong in token creation",
            }
        }
    }
}

module.exports = UserService;