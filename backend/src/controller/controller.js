const sequelize = require('../database/db')
const fiscalUnit = require('../models/FiscalUnit')
const fiscalOffice = require('../models/FiscalOffice')
const technician = require('../models/Technical')
const files = require('../models/File')
const dates = require('../models/FileDate')
const details = require('../models/Detail')
const conditions = require('../models/Condition')
const districts = require("../models/District")
const type = require("../models/FileType")
const { Op } = require("sequelize");
module.exports = controller = {

    getFiles: async (req, res) => {
        res.send(await files.findAll({
            include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
        }))
    },
    getFileById: async (req, res) => {
        let id = req.params.id
        try {
            const result = await sequelize.transaction(async (t) => {
                res.send(await files.findOne({
                    where: {
                        id: id
                    },
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
                }, { transaction: t }));
            })
        } catch (error) {
            console.log(error)
            res.send({ message: "Ocurrió un error", status: 0 })
        }
    },
    getByShiftDay: async (req, res) => {

        let param = req.params.day,
            data = [],
            shift_dates

        try {
            const result = await sequelize.transaction(async (t) => {
                shift_dates = await dates.findAll({
                    where: {
                        shift_date: new Date(param),
                    },
                    include: files
                }, { transaction: t })

                for (date of shift_dates) {
                    data.push(await files.findAll({
                        where: {
                            FileDateId: date.id
                        },
                        include: [dates, technician, fiscalOffice, fiscalUnit, details, type]
                    }, { transaction: t }))
                }
                res.send(shift_dates)
            })
        } catch (error) {
            console.log(error)
        }
    },
    getByEgressDay: async (req, res) => {

        let param = req.params.day
        try {
            const results = sequelize.transaction(async (t) => {
                res.send(await dates.findAll({
                    where: {
                        egress_date: new Date(param),
                    },
                    include: files
                }, { transaction: t }))
            })
        } catch (error) {
            console.log(error)
        }
    },
    getByAdmissionDay: async (req, res) => {
        let param = req.params.day,
            admission_dates

        try {
            const results = await sequelize.transaction(async (t) => {
                res.send(await dates.findAll({
                    where: {
                        egress_date: new Date(param),
                    },
                    include: files
                }, { transaction: t }))
            })
        } catch (error) {
            console.log(error)
        }
    },
    getCurrentDayFiles: async (req, res) => {

        let today = new Date(),
            dd = String(today.getDate()).padStart(2, '0'),
            mm = String(today.getMonth() + 1).padStart(2, '0'),
            yyyy = today.getFullYear(),
            ids = []

        try {
            const results = sequelize.transaction(async (t) => {
                let startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0),
                    finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 59, 59, 0),
                    betweenDates = await dates.findAll({
                        where: {
                            shift_date: {
                                [Op.between]: [startDate, finalDate]
                            }
                        }
                    }, { transaction: t })

                betweenDates.forEach((today) => {
                    ids.push(today.id)
                })

                res.send(await files.findAll({
                    where: {
                        FileDateId: ids
                    },
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions, type]
                }, { transaction: t }))

            })
        } catch (error) {
            console.log(error)
        }
    },
    getFileByFileNumber: async (req, res) => {
        let fileNumber = req.params.file_number
        fileNumber = fileNumber.replace('-', '/')
        try {
            const result = sequelize.transaction(async (t) => {
                res.send(await files.findAll({
                    where: {
                        file_number: {
                            [Op.like]: `%${fileNumber}%`
                        }
                    },
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions, type],
                }, { transaction: t }))
            })
        } catch (error) {
            console.log(error)
            res.send({ message: "Algo ocurrió mal", status: 0 })
        }
    },
    getFormData: async (req, res) => {
        try {
            const result = sequelize.transaction(async (t) => {
                res.send({
                    fiscalOffices: await fiscalOffice.findAll({ transaction: t }),
                    fiscalUnits: await fiscalUnit.findAll({
                        include: districts,
                    }, { transaction: t }),
                    condition: await conditions.findAll({ transaction: t }),
                    technicians: await technician.findAll({ transaction: t }),
                    types: await type.findAll({ transaction: t })
                })
            })
        } catch (error) {
            res.send({ message: "Algo ocurrio mal", status: 0 })
        }
    },
    getLastFiles: async (req, res) => {
        let number = parseInt(req.params.number)
        try {
            const result = await sequelize.transaction(async (t) => {
                const lastFiles = await files.findAll({
                    limit: number,
                    order: [['id', 'DESC']],
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
                }, { transaction: t })
                res.send(lastFiles)
            })
        } catch (error) {
            res.send({ message: "Ocurrió un error", status: 0 })
        }

    },
    updateFiles: async (req, res) => {

        let newFile = req.body,
            oldDate,
            oldFile

        console.log(newFile)
        for (const key in newFile) {
            if (newFile[key] === 0 || newFile[key] === "0" || newFile[key] === '') {
                newFile[key] = null
            }
        }
        oldFile = await files.findByPk(newFile.file_id)
        oldDate = await dates.findByPk(newFile.date_id)

        oldDate.egress_date = newFile.egress_date
        oldDate.admission_date = newFile.admission_date
        oldDate.shift_date = newFile.shift_date

        oldFile.ConditionId = newFile.ConditionId
        oldFile.FiscalOfficeId = newFile.FiscalOfficeId
        oldFile.FiscalUnitId = newFile.FiscalUnitId
        oldFile.TechnicalId = newFile.TechnicalId
        oldFile.file_number = newFile.file_number.slice(0, -2) + "/" + newFile.file_number.slice(-2)
        oldFile.FileTypeId = newFile.file_type

        oldDate = await oldDate.save().catch(function (error) {
            console.log(error)
            res.send({ message: "Error con las fechas", status: 0 })
        })
        oldFile = await oldFile.save().catch(function (error) {
            console.log(error)
            res.send({ message: "Error al actualizar", status: 0 })
        })

        res.send({ message: "Expediente " + newFile.file_number + " actualizado correctamente", status: 1 })
    },
    newFile: async (req, res) => {

        let request = req.body

        console.log(request)

        for (const key in request) {
            if (request[key] === '' || request[key] === '0' || request[key] === 0) {
                request[key] = null
            }
        }
        request.file_number = request.file_number.slice(0, -2) + "/" + request.file_number.slice(-2)
        if (request.file_type === "1") {
            request.file_number = "p-" + request.file_number
        } else {
            request.file_number = "t-" + request.file_number
        }

        try {
            newDates = await dates.create({
                shift_date: new Date(request.shift_date),
                admission_date: new Date(request.admission_date),
                egress_date: new Date(request.egress_date)
            })
            newFile = await files.create({
                FiscalOfficeId: request.FiscalOfficeId,
                FiscalUnitId: request.FiscalUnitId,
                FileDateId: newDates.id,
                TechnicalId: request.TechnicalId,
                ConditionId: request.ConditionId,
                shift_granted: "si",
                file_number: request.file_number,
                FileTypeId: request.file_type
            })
            newDetail = await details.create({
                detail: request.detail,
                FileId: newFile.id
            })

        } catch (error) {
            res.send({ message: "Ocurrió un error", status: 0 })
        }
        res.send({ message: "Expediente cargado correctamente", status: 1 })
    },
    updateDetail: async (req, res) => {
        let params = req.body
        console.log(params)
        try {
            const result = await sequelize.transaction(async (t) => {
                let detail = await details.findByPk(params.detail_id, { transaction: t })
                detail.detail = params.detail
                detail = await detail.save({ transaction: t })
                res.send(detail)
            })
        } catch (error) {
            console.log(error)
            res.send({ message: "Ocurrió un error", status: 0 })
        }
    },
}