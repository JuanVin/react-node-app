const extractionController = require("../controller/extraction.controller")
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.get('/api/files/get_extraction/:id', [authJwt.verifyToken], extractionController.getExtractionDevices)
    app.get('/api/files/get_extractions_by_id/:id', [authJwt.verifyToken], extractionController.getExtractionsById)

    app.post('/api/files/set_extraction_number', [authJwt.verifyToken], extractionController.createExtraction)
    app.post('/api/files/update_extraction', [authJwt.verifyToken], extractionController.updateExtraction)
    app.post('/api/files/update_extraction_number', [authJwt.verifyToken], extractionController.updateExtractionNumber)
    app.post('/api/files/update_device_numbers', [authJwt.verifyToken], extractionController.updateDeviceNumbers)
    app.post('/api/files/new_device', [authJwt.verifyToken], extractionController.newDevice)
    app.post('/api/files/update_device', [authJwt.verifyToken], extractionController.updateDevice)

    app.delete('/api/files/delete_device', [authJwt.verifyToken], extractionController.deleteDevice)
}