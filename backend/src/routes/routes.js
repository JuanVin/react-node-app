
let controller = require('../controller/controller')
const { authJwt } = require("../middleware");
module.exports = (app) => {
    app.get('/api/files/date/egress/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByEgressDay)
    app.get('/api/files/date/admission/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByAdmissionDay)
    app.get('/api/files/date/shift/:day', [authJwt.verifyToken, authJwt.isAdmin], controller.getByShiftDay)
    app.get('/api/files/date/current_day', [authJwt.verifyToken], controller.getCurrentDayFiles)
    app.get('/api/files/:file_number', [authJwt.verifyToken], controller.getFileByFileNumber)
    app.get('/api/files/form/data', [authJwt.verifyToken], controller.getFormData)
    app.get('/api/files/get/:id', [authJwt.verifyToken], controller.getFileById)
    app.get('/api/files/stadistics/:dates', [authJwt.verifyToken, authJwt.isAdmin], controller.getStadisticsByDate)
    app.get('/api/files/technician/:params', [authJwt.verifyToken, authJwt.isAdmin], controller.getFileByTechnician)
    app.get('/api/files/user/:id', controller.getFilebyUserId)
    app.get('/api/files/calendar/:date', [authJwt.verifyToken], controller.getCalendar)

    app.post('/api/files/form/update', [authJwt.verifyToken], controller.updateFiles)
    app.post('/api/files/details/update', [authJwt.verifyToken], controller.updateDetail)
    app.post('/api/files/details/new_detail', [authJwt.verifyToken], controller.newDetail)
    app.post('/api/files/form/new_file', [authJwt.verifyToken], controller.newFile)

    app.delete('/api/files/details/delete/:id', [authJwt.verifyToken], controller.deleteDetail)
}