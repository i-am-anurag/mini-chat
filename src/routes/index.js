const express = require('express');
const serverRoutes = require('./server');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth',userRoutes);
router.use('/server',serverRoutes);

module.exports = router;