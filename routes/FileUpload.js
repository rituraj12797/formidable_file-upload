const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerSetup');

const {
    localFileUpload
} = require('../controllers/fileUpload');


router.post('/localFile',localFileUpload);

module.exports = router;