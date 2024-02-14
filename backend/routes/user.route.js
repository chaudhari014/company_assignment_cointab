const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getAllUser, addUser } = require('../controller/user.controller');

router.get('/all', getAllUser);

router.post('/add', addUser);

module.exports = router;
