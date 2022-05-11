const sequelize = require('../database/db')
const fiscalUnit = require('../models/FiscalUnit')
const fiscalOffice = require('../models/FiscalOffice')
const technician = require('../models/Technical')
const files = require('../models/File')
const dates = require('../models/FileDate')
const details = require('../models/Detail')
const conditions = require('../models/Condition')
const districts = require("../models/District")
const { Op } = require("sequelize");
module.exports = controller = {

    getFiles: async (req, res) => {
        res.send(await files.findAll({
            include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
        }))
    },
    getFileById: async (req, res) => {
        let id = req.params.id
        try{
            const result = await sequelize.transaction(async (t) => {
                const file = await files.findOne({
                    where: {
                        id: id
                    },
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
                }, {transaction: t});
                res.send(file) 
            })
        }catch(error){
            console.log(error)
            res.send({message: "Ocurrió un error", status: 0})
        } 
    },
    getByShiftDay: async (req, res) => {

        let param = req.params.day,
            data = [],
            shift_dates


        shift_dates = await dates.findAll({
            where: {
                shift_date: new Date(param),
            },
            include: files
        })

        for (date of shift_dates) {
            data.push(await files.findAll({
                where: {
                    FileDateId: date.id
                },
                include: [dates, technician, fiscalOffice, fiscalUnit, details]
            }))
        }
        res.send(shift_dates)
    },
    getByEgressDay: async (req, res) => {
        let param = req.params.day,
            egress_dates

        egress_dates = await dates.findAll({
            where: {
                egress_date: new Date(param),
            },
            include: files
        })

        res.send(egress_dates)
    },
    getByAdmissionDay: async (req, res) => {
        let param = req.params.day,
            admission_dates

        admission_dates = await dates.findAll({
            where: {
                egress_date: new Date(param),
            },
            include: files
        })

        res.send(admission_dates)
    },
    getCurrentDayFiles: async (req, res) => {
        console.log("asdasd")
        let today = new Date(),
            dd = String(today.getDate()).padStart(2, '0'),
            mm = String(today.getMonth() + 1).padStart(2, '0'), 
            yyyy = today.getFullYear(),
            ids = []

        var newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        var newDate1 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 59, 59, 0);
        console.log(newDate1)
        todayDateFiles = await dates.findAll({
            where: {
                shift_date: {
                    [Op.between]: [newDate, newDate1]
                }
            }
        })

        console.log(todayDateFiles)
        todayDateFiles.forEach((today) => {
            ids.push(today.id)
        })

        let todayFile = await files.findAll({
            where: {
                FileDateId: ids
            },
            include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
        })

        res.send(todayFile)

    },
    getFileByFileNumber: async (req, res) => {
        let fileNumber = req.params.file_number
        fileNumber = fileNumber.replace('-', '/')

        res.send(await files.findAll({
            where: {
                file_number: {
                    [Op.like]: `%${fileNumber}%`
                }
            },
            include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
        }))
    },
    getFormData: async (req, res) => {
        try{
            const result = sequelize.transaction(async (t) => {
                const data = {
                    fiscalOffices: await fiscalOffice.findAll({transaction: t}),
                    fiscalUnits: await fiscalUnit.findAll({
                        include: districts,
                        transaction: t
                    }),
                    condition: await conditions.findAll({transaction: t}),
                    technicians: await technician.findAll({transaction: t})
                }
                res.send(data)
            }) 
        }catch(error){
            res.send({message: "Algo ocurrio mal", status: 0})
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
                }, {transaction: t})
                res.send(lastFiles)
            })
        }catch (error){
            res.send({message: "Ocurrió un error", status: 0})
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
            if (request[key] === '' || request[key] === '0') {
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
                file_number: request.file_number
            })
            newDetail = await details.create({
                detail: request.detail,
                FileId: newFile.id
            })

        } catch (error) {
            res.send({ message: "Ocurrió un error", status: 0 })
        }
        res.send({ message: "Expediente cargado correctamente", status: 1 })
    }

}