var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')

router.get('/files', controller.getFiles)


module.exports = router