const crypto = require('crypto');
const ServerRepository = require('../repository/server-repo');
const { URL_KEY } = require('../config/server-config');

class ServerService {
    constructor(){
        this.serverRepository = new ServerRepository();
    }

    async createServer(serverData) {
        try {
            console.log('Creating server with data: ' + JSON.stringify(serverData));
            const server = await this.serverRepository.findBy({createdBy:serverData.createdBy,name:serverData.name});
            if(server){
                throw {
                    statusCode : 401,
                    message: "This name is already taken.",
                };
            }

            serverData.users = [serverData.createdBy];

            let newServer = await this.serverRepository.create(serverData);

            return newServer;
        } catch (error) {
            console.error(error);
            throw {
                statusCode : error.statusCode || 500,
                message : error.message,
            }
        }
    }

    async updateServer(serverId,serverData) {
        try {
            let server = await this.serverRepository.findBy({createdBy:serverData.createdBy,name:serverData.name});
            if(server){
                throw {
                    statusCode : 401,
                    message: "This name is already taken.",
                };
            }
            server = await this.serverRepository.update(serverId,serverData);

            return server;
        } catch (error) {
            console.error(error);
            throw {
                statusCode : error.statusCode || 500,
                message : error.message,
            }
        }
    }

    async deleteServer(serverId) {
        try {
            const server = await this.serverRepository.delete(serverId);

            if(!server){
                throw {
                    statusCode : 401,
                    message: "Server Not Found",
                }
            }
            
            return "Server Deleted Successfully";
        } catch (error) {
            console.error(error);
            throw {
                statusCode : error.statusCode || 500,
                message : error.message,
            }
        }
    }

    async addUsers(encrypedServerId,userId) {
        try {
            const decipher = crypto.createDecipher('aes256', URL_KEY); 
            const serverId = decipher.update(encrypedServerId, 'hex', 'utf8') + decipher.final('utf8');

            const server = await this.serverRepository.findBy({_id: serverId});
            if(!server){
                throw {
                    statusCode : 404,
                    message : "Server Not Found",
                }
            }
            if(!server.users.includes(userId)){
                server.users.push(userId);
                server.save();
            }

            return server;
        } catch (error) {
            console.error(error);
            throw {
                statusCode : error.statusCode || 500,
                message : error.message,
            }
        }
    }

    async getServerUrl(serverName,userId){
        try {
            const url = await this.serverRepository.findBy({name: serverName,createdBy: userId});
            if(!url){
                throw {
                    statusCode : 404,
                    message : "Server Not Found",
                }
            }

            return url;
        } catch (error) {
            console.error(error);
            throw {
                statusCode : error.statusCode || 500,
                message : error.message,
            }
        }
    }

}

module.exports = ServerService;