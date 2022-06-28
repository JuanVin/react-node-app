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
    getFileById: async (req, res) => {
        let id = req.params.id
        try {
            const result = await sequelize.transaction(async (t) => {
                res.status(200).send(await files.findOne({
                    where: {
                        id: id
                    },
                    include: [dates, details, fiscalOffice, fiscalUnit, technician, conditions, type]
                }, { transaction: t }));
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "Ocurrió un error" })
        }
    },
    getByShiftDay: async (req, res) => {

        let startDate = new Date(req.params.day)
        startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset())

        let finalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 20, 59, 59, 0)

        try {
            const result = await sequelize.transaction(async (t) => {
                res.status(200).send(await files.findAll({
                    include: [
                        {
                            model: dates, where: {
                                shift_date: {
                                    [Op.between]: [startDate, finalDate]
                                }
                            }
                        },
                        { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }
                    ],
                }, { transaction: t }))
            })
        } catch (error) {
            res.status(400).send("Algo salió mal")
        }
    },
    getByEgressDay: async (req, res) => {
        let param = new Date(req.params.day)
        param.setMinutes(param.getMinutes() + param.getTimezoneOffset())
        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(await files.findAll({
                    include: [{
                        model: dates, where: {
                            egress_date: {
                                [Op.like]: `%${param}`
                            },
                        },
                    },
                    { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }],
                }, { transaction: t }))
            })
        } catch (error) {
            res.status(400).send({ message: "Algo salió mal" })
        }
    },
    getByAdmissionDay: async (req, res) => {
        let param = new Date(req.params.day)
        param.setMinutes(param.getMinutes() + param.getTimezoneOffset())

        try {
            const results = await sequelize.transaction(async (t) => {
                res.status(200).send(await files.findAll({
                    include: [{
                        model: dates, where: {
                            admission_date: {
                                [Op.like]: `%${param}`
                            },
                        },
                    },
                    { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }],
                }, { transaction: t }))
            })
        } catch (error) {
            res.status(400).send({ message: "Algo salió mal" })
        }
    },
    getCurrentDayFiles: async (req, res) => {
        let today = new Date(),
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0),
            finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 59, 59, 0)
        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(await files.findAll({
                    include:
                        [
                            {
                                model: dates, where: {
                                    shift_date: {
                                        [Op.between]: [startDate, finalDate]
                                    }
                                }
                            },
                            { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }
                        ],
                    attributes: {
                        exclude: ["ConditionId", "FileDateId", "FileTypeId", "FiscalOfficeId", "createdAt", "updatedAt"]
                    }
                }, { transaction: t }))
            })
        } catch (error) {
            res.status(400).send({ message: "Algo salió mal" })
        }
    },
    getFileByFileNumber: async (req, res) => {
        let fileNumber = req.params.file_number
        fileNumber = fileNumber.replace('-', '/')
        try {
            const result = sequelize.transaction(async (t) => {
                res.status(200).send(await files.findAll({
                    where: {
                        file_number: {
                            [Op.like]: `%${fileNumber}%`
                        }
                    },
                    include: [
                        { model: dates, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }
                    ],
                    attributes: {
                        exclude: ["ConditionId", "FileDateId", "FileTypeId", "FiscalOfficeId", "createdAt", "updatedAt"]
                    }
                }, { transaction: t }))
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "Algo ocurrió mal" })
        }
    },
    getFormData: async (req, res) => {
        try {
            const result = sequelize.transaction(async (t) => {
                res.status(200).send({
                    fiscalOffices: await fiscalOffice.findAll({ transaction: t }),
                    fiscalUnits: await fiscalUnit.findAll({
                        include: [
                            {
                                model: districts,
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            }
                        ],
                    }, { transaction: t }),
                    condition: await conditions.findAll({ transaction: t }),
                    technicians: await technician.findAll({ transaction: t }),
                    types: await type.findAll({ transaction: t })
                })
            })
        } catch (error) {
            res.status(400).send({ message: "Algo ocurrio mal" })
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
                res.status(200).send(lastFiles)
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error" })
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

        try {
            const results = sequelize.transaction(async (t) => {
                oldDate = await oldDate.save({ transaction: t })
                oldFile = await oldFile.save({ transaction: t })
                res.status(200).send({ message: "Expediente " + newFile.file_number + " actualizado correctamente", status: 200 })
            })
        } catch (error) {
            res.status(400).send({ message: "Algo ocurrió mal", status: 400 })
        }
    },
    newFile: async (req, res) => {

        let request = req.body

        for (const key in request) {
            if (request[key] === '' || request[key] === '0' || request[key] === 0) {
                request[key] = null
            }
        }

        request.file_number = request.file_number.slice(0, -2) + "/" + request.file_number.slice(-2)

        try {
            const results = sequelize.transaction(async (t) => {
                newDates = await dates.create({
                    shift_date: request.shift_date,
                    admission_date: request.admission_date,
                    egress_date: request.egress_date
                }, { transaction: t })
                newFile = await files.create({
                    FiscalOfficeId: request.FiscalOfficeId,
                    FiscalUnitId: request.FiscalUnitId,
                    FileDateId: newDates.id,
                    TechnicalId: request.TechnicalId,
                    ConditionId: request.ConditionId,
                    shift_granted: "si",
                    file_number: request.file_number,
                    FileTypeId: request.file_type
                }, { transaction: t })
                newDetail = await details.create({
                    detail: request.detail,
                    FileId: newFile.id
                }, { transaction: t })
            })
            res.status(200).send({ message: "Expediente cargado correctamente", status: 200 })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", status: 400 })
        }

    },
    updateDetail: async (req, res) => {

        let params = req.body
        console.log(params)
        try {
            const result = await sequelize.transaction(async (t) => {
                let detail = await details.findByPk(params.detail_id, { transaction: t })
                detail.detail = params.detail
                detail = await detail.save({ transaction: t })
                res.statusCode = 200
                res.status(200).send({ message: "Detalle actualizado correctamente", detail: detail, status: 200 })
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", detail: null, status: 400 })
        }
    },
    newDetail: async (req, res) => {
        let params = req.body
        try {
            const resuls = await sequelize.transaction(async (t) => {
                let detail = await details.create(
                    {
                        FileId: params.file_id,
                        detail: params.detail
                    },
                    {
                        transaction: t
                    }
                )
                res.send({ message: "Detalle cargado correctamente", detail: detail, status: 200 })
            })
        } catch (error) {
            res.send({ message: "Ocurrió un error", detail: null, status: 400 })
        }
    },
    deleteDetail: async (req, res) => {

        let id = req.params.id

        try {
            const resuls = await sequelize.transaction(async (t) => {
                let detail = await details.findByPk(id, { transaction: t })
                await detail.destroy({ transaction: t })
                res.send({ message: "Detalle borrado correctamente", status: 200 })
            })
        } catch (error) {
            res.send({ message: "Ocurrió un error", status: 400 })
        }
    },
    getStadisticsByDate: async (req, res) => {
        let fileStadistic = [],
            technicianStadistic = [],
            pendingFiles,
            startDate = new Date(req.body.start),
            endDate = new Date(req.body.end),
            total = 0

        try {
            const results = await sequelize.transaction(async (t) => {
                let _conditions = await conditions.findAll({ transaction: t }),
                    _technicians = await technician.findAll({ transaction: t })

                for (const key in _conditions) {

                    fileStadistic.push(
                        {
                            name: (_conditions[key].condition).replace(" ", "_"),
                            amount: await dates.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: files, where: {
                                            ConditionId: _conditions[key].id,
                                        }
                                    }
                                }, { transaction: t })
                        }
                    )
                    total += fileStadistic[key].amount
                }
                for (const key in _technicians) {
                    technicianStadistic.push(
                        {
                            name: _technicians[key].name,
                            amount: await dates.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: files, where: {
                                            TechnicalId: _technicians[key].id,
                                            ConditionId: (await conditions.findOne({
                                                where: {
                                                    condition: "archivado"
                                                }
                                            }, { transaction: t })).id
                                        }
                                    }
                                },
                                { transaction: t }
                            ),
                            amount2: await dates.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: files, where: {
                                            TechnicalId: _technicians[key].id,
                                            ConditionId: (await conditions.findOne({
                                                where: {
                                                    condition: "falta entregar"
                                                }
                                            }, { transaction: t })).id
                                        }
                                    }
                                },
                                { transaction: t }
                            ),
                        }
                    )
                }
                pendingFiles = await dates.findAll(
                    {
                        where: {
                            shift_date: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        include: {
                            model: files, where: {
                                ConditionId: (await conditions.findOne({
                                    where: {
                                        condition: "falta comenzar"
                                    }
                                }, { transaction: t })).id
                            }
                        }
                    },
                    { transaction: t }
                )

                fileStadistic.push({ total: total })

                res.send({ fileStadistic: fileStadistic, technicianStadistic: technicianStadistic, pendingFiles: pendingFiles })
            })
        } catch (error) {
            res.send("error")
        }
    },
    getTechnicians: async (req, res) => {
        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(
                    await technician.findAll()
                )
            }, { transaction: t })
        } catch (error) {
            res.status(400).send({ message: "Ha ocurrido un error" })
        }
    },
    getFileByTechnician: async (req, res) => {
        let data = req.body,
            startDate = new Date(data.startDate),
            endDate = new Date(data.endDate)

        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(
                    await files.findAll({
                        where: {
                            TechnicalId: data.technician
                        },
                        include: [
                            {
                                model: dates, where: {
                                    shift_date: {
                                        [Op.between]: [startDate, endDate]
                                    }
                                },
                            },
                            { model: details, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: fiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: fiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: conditions, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: type, attributes: { exclude: ["createdAt", "updatedAt"] } }
                        ]
                    })
                )
            })
        } catch (error) {
            console.log(error)
        }
    },
    newExtraction: async (req, res) => {
       console.log(req.body)
        res.send({status: "ok"})
    },
}