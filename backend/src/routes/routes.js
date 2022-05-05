var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')

router.get('/files', controller.getFiles)
router.get('/files/date/egress_day/:day', controller.getByEgressDay)
router.get('/files/date/admission_day/:day', controller.getByAdmissionDay)
router.get('/files/date/shift_day/:day', controller.getByShiftDay)
router.get('/files/date/current_day', controller.getCurrentDayFiles)
router.get('/files/:file_number', controller.getFileByFileNumber)

module.exports = router