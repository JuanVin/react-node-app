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
router.get('/api/files/get/:id', controller.getFileById)
router.get('/api/technicians', controller.getTechnicians)
router.get('/api/files/get_extraction/:id', controller.getExtractionInfo)
router.get('/api/files/get_extractions_by_id/:id', controller.getExtractionsById)

router.post('/api/files/form/update', controller.updateFiles)
router.post('/api/files/details/update', controller.updateDetail)
router.post('/api/files/details/new_detail', controller.newDetail)
router.post('/api/files/stadistics/all', controller.getStadisticsByDate)
router.post('/api/files/technician', controller.getFileByTechnician)
router.post('/api/files/new_extraction', controller.newExtraction)
router.post('/api/files/set_extraction_number', controller.setExtractionNumber)
router.post('/api/files/form/new_file', controller.newFile)
router.post('/api/files/update_extraction', controller.updateExtraction)
router.post('/api/files/update_extraction_number', controller.updateExtractionNumber)
router.post('/api/files/update_device_numbers', controller.updateDeviceNumbers)

router.delete('/api/files/delete_extraction_form', controller.deleteExtraction)
router.delete('/api/files/details/delete/:id', controller.deleteDetail)


module.exports = router