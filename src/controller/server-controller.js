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
            message: "Successfully created a user",
            data: response,
            error: {},
        })
    } catch (error) {
        console.log("Something went wrong when creating sever with error message",error);
        const statusCode =  error.statusCode ?? 500;
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

// const updateServer = (req, res) => {
//     try {
//         const {serverId} = req.params;

//     } catch (error) {
        
//     }
// }

const deleteServer = async(req, res) => {
    try {
        const {serverId} = req.params;
        await serverService.deleteServer(serverId);

        return res.status(200).json({
            success: true,
            message: "Sucessfully deleted server",
            data: response,
            error: {},
        })
    } catch (error) {
        const statusCode =  error.statusCode ?? 500;
        return res.status(statusCode).json({
            success: false,
            data: {},
            error: error
        });
    }
}

const addUser = async(req, res) => {
    try {
        const {serverId} = req.params;
        const userId = req.user._id;
        
        const server = await serverService.addUsers(serverId,userId);

        return res.status(200).json({
            success: true,
            message: "Successfully added user",
            data: server,
        });
    } catch (error) {
        const statusCode =  error.statusCode ?? 500;
        return res.status(statusCode).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

module.exports = {
    createServer,
    deleteServer,
    addUser,
}