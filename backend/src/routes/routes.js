var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')

router.get('/api/files/date/egress/:day', controller.getByEgressDay)
router.get('/api/files/date/admission/:day', controller.getByAdmissionDay)
router.get('/api/files/date/shift/:day', controller.getByShiftDay)
router.get('/api/files/date/current_day', controller.getCurrentDayFiles)
router.get('/api/files/:file_number', controller.getFileByFileNumber)
router.get('/api/files/form/data', controller.getFormData)
router.get('/api/files/last/:number', controller.getLastFiles)
router.post('/api/files/form/new_file', controller.newFile)
router.get('/api/files/get/:id', controller.getFileById)
router.post('/api/files/form/update', controller.updateFiles)
router.post('/api/files/details/update', controller.updateDetail)
router.post('/api/files/details/new_detail', controller.newDetail)
router.delete('/api/files/details/delete/:id', controller.deleteDetail)
router.post('/api/files/stadistics/all', controller.getStadisticsByDate)
router.post('/api/files/technician', controller.getFileByTechnician)
router.get('/api/technicians', controller.getTechnicians)
router.post('/api/files/new_extraction', controller.newExtraction)

module.exports = router