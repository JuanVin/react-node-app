
let controller = require('../controller/controller')
const { authJwt } = require("../middleware");
module.exports = (app) => {
    app.get('/api/files/date/egress/:day', controller.getByEgressDay)
    app.get('/api/files/date/admission/:day', [authJwt.verifyToken], controller.getByAdmissionDay)
    app.get('/api/files/date/shift/:day', controller.getByShiftDay)
    app.get('/api/files/date/current_day', [authJwt.verifyToken], controller.getCurrentDayFiles)
    app.get('/api/files/:file_number', controller.getFileByFileNumber)
    app.get('/api/files/form/data', controller.getFormData)
    app.get('/api/files/last/:number', controller.getLastFiles)
    app.get('/api/files/get/:id', controller.getFileById)
    app.get('/api/technicians', [authJwt.verifyToken], controller.getTechnicians)
    app.get('/api/files/get_extraction/:id', controller.getExtractionInfo)
    app.get('/api/files/get_extractions_by_id/:id', controller.getExtractionsById)

    app.post('/api/files/form/update', [authJwt.verifyToken], controller.updateFiles)
    app.post('/api/files/details/update', controller.updateDetail)
    app.post('/api/files/details/new_detail', controller.newDetail)
    app.post('/api/files/stadistics/all', controller.getStadisticsByDate)
    app.post('/api/files/technician', [authJwt.verifyToken, authJwt.isAdmin], controller.getFileByTechnician)
    app.post('/api/files/new_extraction', [authJwt.verifyToken], controller.newExtraction)
    app.post('/api/files/set_extraction_number', [authJwt.verifyToken], controller.setExtractionNumber)
    app.post('/api/files/form/new_file', [authJwt.verifyToken], controller.newFile)
    app.post('/api/files/update_extraction', [authJwt.verifyToken], controller.updateExtraction)
    app.post('/api/files/update_extraction_number', [authJwt.verifyToken], controller.updateExtractionNumber)
    app.post('/api/files/update_device_numbers', [authJwt.verifyToken], controller.updateDeviceNumbers)

    app.delete('/api/files/delete_extraction_form', controller.deleteExtraction)
    app.delete('/api/files/details/delete/:id', controller.deleteDetail)
}