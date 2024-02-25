const express = require('express');
const userroutes = require('./user');

const router = express.Router();

router.use('/auth',userroutes);

module.exports = router;