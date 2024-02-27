const ServerRepository = require('../repository/server-repo');

class ServerService {
    constructor(){
        this.serverRepository = new ServerRepository();
    }
    async createServer(serverData,userId) {
        try {
            const server = await this.serverRepository.findBy({createdBy: userId,name:serverData.name});
            if(server){
                throw new Error('This server is already exists');
            }

            let newServer = await this.serverRepository.create(userdata);

            return newServer;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    
}

module.exports = ServerService;