const Server = require('../models/server');
const CrudRepository = require('./crud-repository');

class ServerRepository extends CrudRepository {
    constructor() {
        super(User);
    }
};

module.exports = ServerRepository;