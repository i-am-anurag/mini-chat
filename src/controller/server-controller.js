const ServerService = require('../services/server-service')

const serverService = new ServerService();

const createServer = async(req, res) => {
    try {
        const {server_name: name} = {...req.body};
        const userId = req.user._id;
        const response = await serverService.createServer({name,createdBy:userId});

        if(!name){
            throw {
                statusCode: 401,
                message: "Server name is missing",
            }
        }

        return res.status(201).json({
            success: true,
            message: "Successfully registered a user",
            data: response,
            error: {},
        })
    } catch (error) {
        console.log("Something went wrong when creating sever with error message",error);
        const statusCode =  error.statusCode ?? 503;
        return res.status(500).json({
            success: false,
            data: {},
            error: error
        });
    }
}

module.exports = {
    createServer,
}