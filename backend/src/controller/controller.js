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
            mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
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

        let data

        data = {
            fiscalOffices: await fiscalOffice.findAll(),
            fiscalUnits: await fiscalUnit.findAll({
                include: districts
            }),
            condition: await conditions.findAll(),
            technicians: await technician.findAll()
        }

        res.send(data)

    },
    getLastFiles: async (req, res) => {

        let number = parseInt(req.params.number)
        const results = await files.findAll({
            limit: number,
            order: [['id', 'DESC']],
            include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions]
        })
        res.send(results)
    },
    newFile: async (req, res) => {

        let request = req.body

        for (const key in request) {
            if (request[key] === '' || request[key] === '0') {
                request[key] = null
            }
        }
        request.file_number = request.file_number.slice(0, -2) + "/" + request.file_number.slice(-2)

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

        }catch(error){
            res.send({ message: "Ocurrió un error", status: 0 })
        }
        res.send({ message: "Expediente cargado correctamente", status: 1 })
    }

}