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

const userProfile = async (req,res)=>{
    try {
        const userId = req.user._id;
        console.log("UserID",userId);
        const user = await userService.getUserById(userId);
        if(!user){
            throw Error('User Not Found');
        }
        delete user.password; // Remove password from output

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
            error: {},
        })
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "Error in get User Profile",
            data: {},
            error: error.message,
        });
    }
}

module.exports = {
    signUp,
    login,
    userProfile,
}