var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')

router.get('/files', controller.getFiles)
router.get('/files/date/egress_day/:day', controller.getByEgressDay)
router.get('/files/date/admission_day/:day', controller.getByAdmissionDay)
router.get('/files/date/shift/:day', controller.getByShiftDay)
router.get('/files/date/current_day', controller.getCurrentDayFiles)
router.get('/files/:file_number', controller.getFileByFileNumber)
router.get('/files/form/data', controller.getFormData)

module.exports = router