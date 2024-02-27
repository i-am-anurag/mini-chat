const express = require('express');
const {requestvalidator} = require('../middleware/auth-middleware');
const { createServer } = require('../controller/server-controller');


const router = express.Router();

router.post('/create-server',requestvalidator,createServer);

module.exports = router;