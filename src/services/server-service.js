const ServerRepository = require('../repository/server-repo');

class ServerService {
    constructor(){
        this.serverRepository = new ServerRepository();
    }
    async createServer(serverData) {
        try {
            const server = await this.serverRepository.findBy({createdBy:serverData.createdBy,name:serverData.name});
            if(server){
                throw {
                    statusCode : 401,
                    message: "This name is already taken.",
                };
            }

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

    
}

module.exports = ServerService;