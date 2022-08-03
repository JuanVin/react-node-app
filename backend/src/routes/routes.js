var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')
const { authJwt } = require("../middleware");

router.get('/api/files/date/egress/:day', controller.getByEgressDay)
router.get('/api/files/date/admission/:day', [authJwt.verifyToken], controller.getByAdmissionDay)
router.get('/api/files/date/shift/:day', controller.getByShiftDay)
router.get('/api/files/date/current_day', [authJwt.verifyToken], controller.getCurrentDayFiles)
router.get('/api/files/:file_number', controller.getFileByFileNumber)
router.get('/api/files/form/data', controller.getFormData)
router.get('/api/files/last/:number', controller.getLastFiles)
router.get('/api/files/get/:id', controller.getFileById)
router.get('/api/technicians', [authJwt.verifyToken], controller.getTechnicians)
router.get('/api/files/get_extraction/:id', controller.getExtractionInfo)
router.get('/api/files/get_extractions_by_id/:id', controller.getExtractionsById)

router.post('/api/files/form/update', [authJwt.verifyToken], controller.updateFiles)
router.post('/api/files/details/update', controller.updateDetail)
router.post('/api/files/details/new_detail', controller.newDetail)
router.post('/api/files/stadistics/all', controller.getStadisticsByDate)
router.post('/api/files/technician', [authJwt.verifyToken, authJwt.isAdmin], controller.getFileByTechnician)
router.post('/api/files/new_extraction', [authJwt.verifyToken], controller.newExtraction)
router.post('/api/files/set_extraction_number', [authJwt.verifyToken], controller.setExtractionNumber)
router.post('/api/files/form/new_file', [authJwt.verifyToken], controller.newFile)
router.post('/api/files/update_extraction', [authJwt.verifyToken], controller.updateExtraction)
router.post('/api/files/update_extraction_number', [authJwt.verifyToken], controller.updateExtractionNumber)
router.post('/api/files/update_device_numbers', [authJwt.verifyToken], controller.updateDeviceNumbers)

router.delete('/api/files/delete_extraction_form', controller.deleteExtraction)
router.delete('/api/files/details/delete/:id', controller.deleteDetail)


module.exports = router