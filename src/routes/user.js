const express = require('express');
const {signinmiddleware,signupmiddleware} = require('../middleware/auth-middleware');
const {signUp,login} = require('../controller/user-controller')

const router = express.Router();

router.post('/signup',signupmiddleware,signUp);
router.post('/login',signinmiddleware,login);

module.exports = router;