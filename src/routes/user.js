const express = require('express');
const {signinmiddleware,signupmiddleware,requestvalidator} = require('../middleware/auth-middleware');
const {signUp,login, userProfile} = require('../controller/user-controller')

const router = express.Router();

router.post('/signup',signupmiddleware,signUp);
router.post('/login',signinmiddleware,login);
router.get('/profile',requestvalidator,userProfile)

module.exports = router;