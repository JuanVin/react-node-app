
let controller = require('../controller/controller')
const { authJwt } = require("../middleware");
module.exports = (app) => {
    app.get('/api/files/date/egress/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByEgressDay)
    app.get('/api/files/date/admission/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByAdmissionDay)
    app.get('/api/files/date/shift/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByShiftDay)
    app.get('/api/files/date/current_day', [authJwt.verifyToken], controller.getCurrentDayFiles)
    app.get('/api/files/:file_number', [authJwt.verifyToken], controller.getFileByFileNumber)
    app.get('/api/files/form/data', [authJwt.verifyToken], controller.getFormData)
    app.get('/api/files/last/:number', [authJwt.verifyToken], controller.getLastFiles)
    app.get('/api/files/get/:id', [authJwt.verifyToken], controller.getFileById)
    app.get('/api/technicians', [authJwt.verifyToken], controller.getTechnicians)
    app.get('/api/files/get_extraction/:id', [authJwt.verifyToken], controller.getExtractionInfo)
    app.get('/api/files/get_extractions_by_id/:id', [authJwt.verifyToken], controller.getExtractionsById)
    app.get('/api/files/stadistics/:dates', [authJwt.verifyToken, authJwt.isAdmin], controller.getStadisticsByDate)
    app.get('/api/files/technician/:params', [authJwt.verifyToken, authJwt.isAdmin], controller.getFileByTechnician)
    app.get('/api/files/user/:id',controller.getFilebyUserId)

    app.post('/api/files/form/update', [authJwt.verifyToken], controller.updateFiles)
    app.post('/api/files/details/update', [authJwt.verifyToken], controller.updateDetail)
    app.post('/api/files/details/new_detail', [authJwt.verifyToken], controller.newDetail)
    app.post('/api/files/new_extraction', [authJwt.verifyToken], controller.newExtraction)
    app.post('/api/files/set_extraction_number', [authJwt.verifyToken], controller.setExtractionNumber)
    app.post('/api/files/form/new_file', [authJwt.verifyToken], controller.newFile)
    app.post('/api/files/update_extraction', [authJwt.verifyToken], controller.updateExtraction)
    app.post('/api/files/update_extraction_number', [authJwt.verifyToken], controller.updateExtractionNumber)
    app.post('/api/files/update_device_numbers', [authJwt.verifyToken], controller.updateDeviceNumbers)

    app.delete('/api/files/delete_extraction_form', [authJwt.verifyToken], controller.deleteExtraction)
    app.delete('/api/files/details/delete/:id', [authJwt.verifyToken], controller.deleteDetail)
}