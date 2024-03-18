const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerSetup');
const {fileUpload} = require("../controllers/controller");


router.post('/localFile',fileUpload);

module.exports = router;