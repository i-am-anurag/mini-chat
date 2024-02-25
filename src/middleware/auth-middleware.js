const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/server-config');
const UserService = require('../services/user-service');

const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const passwordValidator = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };


  const signupmiddleware = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    if (!emailValidator(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    
    if (!passwordValidator(password)) {
        return res.status(400).json({ message: 'Password should be At least 8 characters, one uppercase, one lowercase, one number' });
    }
  
    next();
};

const signinmiddleware = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    if (!emailValidator(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
}

const requestvalidator = async(req,res,next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]

        if(!token) {
            return  res.status(400).json({
                sucess: false,
                message : "No Token Provided",
            })
        }

        const verifytoken = jwt.verify(token,JWT_KEY);
        console.log(verifytoken);

        if(!verifytoken){
            return res.status(401).json({
                success:false ,
                message:"Invalid Token",
            });
        }

        const userService = new UserService();
        const user = await userService.getUserById(verifytoken.user._id);

        if(!user) {
            return res.status(404).json({
                success:false ,
                message:"User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error.name);
        return res.status(500).json({
            sucess:false ,
            message: "Something went wrong",
            error:error.message,
        });
    }
}

module.exports = {
    signinmiddleware,
    signupmiddleware,
    requestvalidator,
}