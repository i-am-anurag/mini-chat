const express = require('express');
const {requestvalidator} = require('../middleware/auth-middleware');
const { createServer, deleteServer, addUser, getServerUrl } = require('../controller/server-controller');


const router = express.Router();

router.post('/create-server',requestvalidator,createServer);
router.delete('/:serverId',requestvalidator,deleteServer);
router.put('/:serverId',requestvalidator,addUser);
router.post('/get-url',requestvalidator,getServerUrl);

module.exports = router;