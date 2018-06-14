const UploadController = require('./UploadController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');

router.post('/lunch', asyncMiddleware(UploadController.addUpload));

module.exports = router;
