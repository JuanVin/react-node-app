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
router.get('/files/last/:number', controller.getLastFiles)
router.post('/files/form/new_file', controller.newFile)
router.get('/files/get/:id', controller.getFileById)
router.post('/files/form/update', controller.updateFiles)
router.post('/files/details/update', controller.updateDetail)
router.post('/files/details/new_detail', controller.newDetail)
router.delete('/files/details/delete/:id', controller.deleteDetail)

module.exports = router