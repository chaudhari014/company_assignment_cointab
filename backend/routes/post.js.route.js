const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getPost, addBulkPost, downloadExcel } = require('../controller/post.controller');

router.get('/:userId',getPost );

router.post('/bulk-add/:userId',addBulkPost );

router.get('/download/:userId',downloadExcel)

module.exports = router;
