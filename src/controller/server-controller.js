const ServerService = require('../services/server-service')

const serverService = new ServerService();

const createServer = async(req, res) => {
    try {
        const requestData = {...req.body};
        const response = await serverService.createServer(requestData);

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

module.exports = {
    createServer,
}