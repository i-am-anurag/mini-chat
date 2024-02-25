const UserService = require('../services/user-service')

const userService = new UserService();

const signUp = async(req, res) => {
    try {
        const requestData = {...req.body};
        const response = await userService.createUser(requestData);

        return res.status(201).json({
            success: true,
            message: "Successfully registered a user",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in user registration process",
            data: {},
            error: error.message,
        });
    }
}

const login = async(req, res) => {
    try {
        const requestData = {...req.body};
        const response = await userService.signin(requestData);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in user signin process",
            data: {},
            error: error.message,
        });
    }
}

module.exports = {
    signUp,
    login,
}