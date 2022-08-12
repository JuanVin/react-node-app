const db = require("../models/index")
const sequelize = db.sequelize
const { Op } = require("sequelize");

module.exports = controller = {
    getFileById: async (req, res) => {
        let id = req.params.id
        try {
            const result = await sequelize.transaction(async (t) => {
                res.status(200).send(await db.File.findOne({
                    where: {
                        id: id
                    },
                    include: [db.FileDate, db.Detail, db.FiscalOffice, db.FiscalUnit,
                    { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password"] } },
                    db.Condition, db.FileType]
                }, { transaction: t }));
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error" })
        }
    },
    getByShiftDay: async (req, res) => {

        let startDate = new Date(req.params.day)
        startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset())

        let finalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 20, 59, 59, 0)

        try {
            const result = await sequelize.transaction(async (t) => {
                res.status(200).send(await db.File.findAll({
                    include: [
                        {
                            model: db.FileDate, where: {
                                shift_date: {
                                    [Op.between]: [startDate, finalDate]
                                }
                            }
                        },
                        { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                        { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } }
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
                res.status(200).send(await db.File.findAll({
                    include: [{
                        model: db.FileDate, where: {
                            egress_date: {
                                [Op.like]: `%${param}`
                            },
                        },
                    },
                    { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                    { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } }],
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
                res.status(200).send(await db.File.findAll({
                    include: [{
                        model: db.FileDate, where: {
                            admission_date: {
                                [Op.like]: `%${param}`
                            },
                        },
                    },
                    { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                    { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } }],
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

                res.status(200).send(await db.File.findAll({
                    include:
                        [
                            {
                                model: db.FileDate, where: {
                                    shift_date: {
                                        [Op.between]: [startDate, finalDate]
                                    }
                                }
                            },
                            { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                            { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: 'createdByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } },
                            { model: db.User, as: 'updatedByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } }
                        ],
                    attributes: {
                        exclude: ["ConditionId", "FileDateId", "FileTypeId", "FiscalOfficeId"]
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
                res.status(200).send(
                    await db.File.findAll({
                        where: {
                            file_number: {
                                [Op.like]: `%${fileNumber}%`
                            }
                        },
                        include: [
                            { model: db.FileDate, required: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                            { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: 'createdByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } },
                            { model: db.User, as: 'updatedByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } }
                        ],
                        attributes: {
                            exclude: ["ConditionId", "FileDateId", "FileTypeId", "FiscalOfficeId", "FiscalUnitId"]
                        }
                    }, { transaction: t }))
            })
        } catch (error) {
            res.status(400).send({ message: "Algo ocurrió mal" })
        }
    },
    getFormData: async (req, res) => {
        try {
            const result = sequelize.transaction(async (t) => {
                res.status(200).send({
                    fiscalOffices: await db.FiscalOffice.findAll({ transaction: t }),
                    fiscalUnits: await db.FiscalUnit.findAll({
                        include: [
                            {
                                model: db.District,
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            }
                        ],
                    }, { transaction: t }),
                    condition: await db.Condition.findAll({ transaction: t }),
                    technicians: await db.User.findAll({ attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } }, { transaction: t }),
                    types: await db.FileType.findAll({ transaction: t })
                })
            })
        } catch (error) {
            res.status(400).send({ message: "Algo ocurrio mal" })
        }
    },

    updateFiles: async (req, res) => {

        let newFile = req.body

        for (const key in newFile) {
            if (newFile[key] === 0 || newFile[key] === "0" || newFile[key] === '') {
                newFile[key] = null
            }
        }

        try {
            const results = sequelize.transaction(async (t) => {
                let oldFile = await db.File.findByPk(newFile.fileId, { transaction: t })
                let oldDate = await db.FileDate.findByPk(newFile.dateId, { transaction: t })

                oldDate.egress_date = newFile.egressDate
                oldDate.admission_date = newFile.admissionDate
                oldDate.shift_date = newFile.shiftDate
                oldFile.ConditionId = newFile.conditionId
                oldFile.FiscalOfficeId = newFile.fiscalOfficeId
                oldFile.FiscalUnitId = newFile.fiscalUnitId
                oldFile.userId = newFile.technicianId
                oldFile.file_number = newFile.fileNumber.slice(0, -2) + "/" + newFile.fileNumber.slice(-2)
                oldFile.FileTypeId = newFile.fileType
                oldFile.updateBy = req.userId
                oldDate = await oldDate.save({ transaction: t })
                oldFile = await oldFile.save({ transaction: t })
                res.status(200).send({ message: "Expediente " + newFile.fileNumber + " actualizado correctamente" })
            })
        } catch (error) {
            res.status(400).send({ message: "Algo ocurrió mal" })
        }
    },
    newFile: async (req, res) => {

        let request = req.body
        for (const key in request) {
            if (request[key] === '' || request[key] === '0' || request[key] === 0) {
                request[key] = null
            }
        }
        request.fileNumber = request.fileNumber.replace("/", "")
        try {
            const results = sequelize.transaction(async (t) => {
                newDates = await db.FileDate.create({
                    shift_date: request.shiftDate,
                    admission_date: request.admissionDate,
                    egress_date: request.egressDate
                }, { transaction: t })
                newFile = await db.File.create({
                    FiscalOfficeId: request.fiscalOfficeId,
                    FiscalUnitId: request.fiscalUnitId,
                    FileDateId: newDates.id,
                    userId: request.technicianId,
                    ConditionId: request.conditionId,
                    shift_granted: "si",
                    file_number: request.fileNumber,
                    FileTypeId: request.fileType,
                    createdBy: req.userId
                }, { transaction: t })
                newDetail = await db.Detail.create({
                    detail: request.detail,
                    FileId: newFile.id
                }, { transaction: t })
            })
            res.status(200).send({ message: "Expediente cargado correctamente" })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error" })
        }

    },
    updateDetail: async (req, res) => {

        let params = req.body
        try {
            const result = await sequelize.transaction(async (t) => {
                let detail = await db.Detail.findByPk(params.detail_id, { transaction: t })
                detail.detail = params.detail
                detail = await detail.save({ transaction: t })
                res.statusCode = 200
                res.status(200).send({ message: "Detalle actualizado correctamente", detail: detail })
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", detail: null })
        }
    },
    newDetail: async (req, res) => {
        let params = req.body
        try {
            const resuls = await sequelize.transaction(async (t) => {
                let detail = await db.Detail.create(
                    {
                        FileId: params.file_id,
                        detail: params.detail
                    },
                    {
                        transaction: t
                    }
                )
                res.status(200).send({ message: "Detalle cargado correctamente", detail: detail })
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", detail: null })
        }
    },
    deleteDetail: async (req, res) => {

        let id = req.params.id

        try {
            const resuls = await sequelize.transaction(async (t) => {
                let detail = await db.Detail.findByPk(id, { transaction: t })
                await detail.destroy({ transaction: t })
                res.status(200).send({ message: "Detalle borrado correctamente" })
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error" })
        }
    },
    getStadisticsByDate: async (req, res) => {

        let dates = JSON.parse(req.params.dates)

        let fileStadistic = [],
            technicianStadistic = [],
            pendingFiles,
            startDate = new Date(dates.start),
            endDate = new Date(dates.end),
            total = 0

        try {
            const results = await sequelize.transaction(async (t) => {
                let _conditions = await db.Condition.findAll({ transaction: t }),
                    _technicians = await db.User.findAll({ attributes: { exclude: ["password", "username"] } }, { transaction: t })

                for (const key in _conditions) {
                    fileStadistic.push(
                        {
                            name: (_conditions[key].condition).replace(" ", "_"),
                            amount: await db.FileDate.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: db.File, where: {
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
                            amount: await db.FileDate.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: db.File, where: {
                                            userId: _technicians[key].id,
                                            ConditionId: (await db.Condition.findOne({
                                                where: {
                                                    condition: "archivado"
                                                }
                                            }, { transaction: t })).id
                                        }
                                    }
                                },
                                { transaction: t }
                            ),
                            amount2: await db.FileDate.count(
                                {
                                    where: {
                                        shift_date: {
                                            [Op.between]: [startDate, endDate]
                                        }
                                    },
                                    include: {
                                        model: db.File, where: {
                                            userId: _technicians[key].id,
                                            ConditionId: (await db.Condition.findOne({
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
                pendingFiles = await db.FileDate.findAll(
                    {
                        where: {
                            shift_date: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        include: {
                            model: db.File, where: {
                                ConditionId: (await db.Condition.findOne({
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

                res.status(200).send({ fileStadistic: fileStadistic, technicianStadistic: technicianStadistic, pendingFiles: pendingFiles })
            })
        } catch (error) {
            res.status(400).send("error")
        }
    },
    getTechnicians: async (req, res) => {
        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(
                    await db.User.findAll({ attributes: { exclude: ["password"] } })
                )
            }, { transaction: t })
        } catch (error) {
            res.status(400).send({ message: "Ha ocurrido un error" })
        }
    },
    getFileByTechnician: async (req, res) => {
        let data = JSON.parse(req.params.params),
            startDate = new Date(data.startDate),
            endDate = new Date(data.endDate)

        try {
            const results = sequelize.transaction(async (t) => {
                res.status(200).send(
                    await db.File.findAll({
                        where: {
                            userId: data.technician
                        },
                        include: [
                            {
                                model: db.FileDate, where: {
                                    shift_date: {
                                        [Op.between]: [startDate, endDate]
                                    }
                                },
                            },
                            { model: db.Detail, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalOffice, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FiscalUnit, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: "technician", attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                            { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: 'createdByUser', attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } },
                            { model: db.User, as: 'updatedByUser', attributes: { exclude: ["createdAt", "updatedAt", "password", "username"] } }
                        ]
                    })
                )
            })
        } catch (error) {
            console.log(error)
        }
    },
    getFilebyUserId: async (req, res) => {

        const userId = req.params.id
        try {
            const results = await sequelize.transaction(async (t) => {
                res.status(200).send(
                    await db.File.findAll(
                        {
                            where: {
                                userId: userId
                            },
                            include: {
                                model: db.Condition,
                                where: {
                                    [Op.and]:
                                        [
                                            { condition: { [Op.not]: 'archivado' } },
                                            { condition: { [Op.not]: 'falta entregar' } },
                                            { condition: { [Op.not]: 'sin efecto' } }
                                        ]
                                }
                            }

                        }, { transaction: t }
                    )
                )
            })
        }
        catch (err) {
            res.status(500).send({ message: err })
        }
    },
    getCalendar: async (req, res) => {
        let { date } = req.params
        date = new Date(date)
        const start = new Date(date.getFullYear(), date.getMonth(), 1)
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)

        res.status(200).send(await db.FileDate.findAll(
            {
                where: {
                    shift_date: {
                        [Op.between]: [start, end]
                    }
                },
                include: [{ model: db.File }]
            }
        ))

    }

}