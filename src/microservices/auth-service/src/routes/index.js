const express = require('express');
const AuthController = require('../controller');

const router = express.Router();

router.post('/auth',  AuthController.login);
router.post('/auth-admin',  AuthController.register);



module.exports = router;