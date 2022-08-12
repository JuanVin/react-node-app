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
                        { model: db.Technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
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
                    { model: db.Technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
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
                    { model: db.Technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
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
                    technicians: await db.Technician.findAll({ transaction: t }),
                    types: await db.FileType.findAll({ transaction: t })
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
                const lastFiles = await db.File.findAll({
                    limit: number,
                    order: [['id', 'DESC']],
                    include: [db.FileDate, db.Detail, db.FiscalOffice, db.FiscalUnit, db.Technician, db.Condition]
                }, { transaction: t })
                res.status(200).send(lastFiles)
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error" })
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
                    TechnicianId: request.technicianId,
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
                    _technicians = await db.Technician.findAll({ transaction: t })

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
                                            TechnicianId: _technicians[key].id,
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
                                            TechnicianId: _technicians[key].id,
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
                    await db.Technician.findAll()
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
                            TechnicianId: data.technician
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
                            { model: db.Technician, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.Condition, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.FileType, attributes: { exclude: ["createdAt", "updatedAt"] } },
                            { model: db.User, as: 'createdByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } },
                            { model: db.User, as: 'updatedByUser', attributes: { exclude: ["createdAt", "updatedAt", "password"] } }
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
        let body = req.body

        try {
            const result = await sequelize.transaction(async (t) => {
                let newExtraction = await db.CellPhone.create({
                    deviceNumber: body.device,
                    phoneBrand: body.phoneBrand,
                    phoneModel: body.phoneModel,
                    type: body.type,
                    simcardNumber1: body.simcard.simcard1.number,
                    simcardNumber2: body.simcard.simcard2.number,
                    simcardCompany1: body.simcard.simcard1.company,
                    simcardCompany2: body.simcard.simcard2.company,
                    imeiNumber1: body.imei.imeiNumber1,
                    imeiNumber2: body.imei.imeiNumber2,
                    batteryBrand: body.battery.brand,
                    batteryModel: body.battery.model,
                    microsdType: body.microsd.type,
                    microsdCapacity: body.microsd.capacity,
                    detail: body.detail,
                    extraction: body.extraction,
                    ExtractionId: (await db.Extraction.findOne({
                        where: {
                            FileId: body.id
                        }
                    })).id
                }, { transaction: t })

                res.status(200).send({ message: "Extracción cargada con éxito", device: newExtraction })
            })
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: "error" })
        }

    },
    setExtractionNumber: async (req, res) => {
        let number = req.body.numberOfDevices,
            id = req.body.fileId

        try {
            const result = await sequelize.transaction(async (t) => {
                let newExtraction = await db.Extraction.create(
                    {
                        numberOfDevices: number,
                        FileId: id
                    }, { transaction: t })
                res.status(200).send({ message: "ok", info: newExtraction.id })
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "Algo salió mal" })
        }
    },
    getExtractionInfo: async (req, res) => {

        const id = req.params.id
        try {
            const result = await sequelize.transaction(async (t) => {

                let response = await db.Extraction.findOne(
                    {
                        where: {
                            FileId: id
                        },
                        include: [db.CellPhone]
                    }, { transaction: t }
                )
                if (response === null) {
                    res.status(404).send({ message: "no hallado" })
                } else {
                    res.status(200).send(response)
                }

            })
        } catch (e) {
            res.status(400).send({ message: "error" })
        }
    },
    getExtractionsById: async (req, res) => {
        const id = req.params.id
        try {
            const result = await sequelize.transaction(async (t) => {
                let response = await db.CellPhone.findAll(
                    {
                        where: {
                            ExtractionId: id
                        }
                    }, { transaction: t }
                )
                if (response.length < 1) {

                    res.status(404).send({ message: "no hallado" })
                } else {
                    res.status(200).send(response)
                }
            })
        } catch (e) {
            res.status(404).send({ message: "error" })
        }
    },
    updateExtraction: async (req, res) => {
        let body = req.body
        try {
            const result = await sequelize.transaction(async (t) => {
                let extraction = await db.CellPhone.findByPk(body.phoneId, { transaction: t })
                if (extraction.deviceNumber !== body.device) {
                    let extraction2 = await db.CellPhone.findOne({
                        where: {
                            deviceNumber: body.device,
                            ExtractionId: body.extractionId
                        }
                    }, { transaction: t })
                    if (extraction2) {
                        extraction2.deviceNumber = extraction.deviceNumber
                        extraction2 = await extraction2.save({ transaction: t })
                    }
                }
                extraction.deviceNumber = body.device
                extraction.phoneBrand = body.phoneBrand
                extraction.phoneModel = body.phoneModel
                extraction.simcardNumber1 = body.simcard.simcard1.number
                extraction.simcardNumber2 = body.simcard.simcard2.number
                extraction.simcardCompany1 = body.simcard.simcard1.company
                extraction.simcardCompany2 = body.simcard.simcard2.company
                extraction.imeiNumber1 = body.imei.imeiNumber1
                extraction.imeiNumber2 = body.imei.imeiNumber2
                extraction.batteryBrand = body.battery.brand
                extraction.batteryModel = body.battery.model
                extraction.microsdType = body.microsd.type
                extraction.microsdCapacity = body.microsd.capacity
                extraction.detail = body.detail
                extraction.extraction = body.extraction
                extraction = await extraction.save({ transaction: t })
                res.status(200).send({ message: "Extracción actualizada con éxito", device: extraction })
            })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", detail: null })
        }
    },
    updateExtractionNumber: async (req, res) => {
        try {
            const result = sequelize.transaction(async (t) => {
                const response = await db.Extraction.findOne({
                    where: {
                        FileId: req.body.id
                    }
                }, { transaction: t })
                response.numberOfDevices = req.body.number
                await response.save({ transaction: t })
                res.status(200).send({ message: "ok" })
            })
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: "Ocurrió un error" })
        }
    },
    deleteExtraction: async (req, res) => {
        let id = req.body.id
        try {
            const result = await sequelize.transaction(async (t) => {
                const phone = await db.CellPhone.findByPk(id, { transaction: t })
                const phones = await db.CellPhone.findAll({
                    where: {
                        ExtractionId: phone.ExtractionId
                    }
                })
                for (let index = 0; index < phones.length; index++) {
                    if (phones[index].deviceNumber > phone.deviceNumber) {
                        phones[index].deviceNumber = (phones[index].deviceNumber) - 1
                        await phones[index].save({ transaction: t })
                    }
                }
                await phone.destroy({ transaction: t })
                res.status(200).send({ message: "Borrado correctamente" })
            })
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: "error" })
        }
    },
    updateDeviceNumbers: async (req, res) => {
        let id = req.body.id,
            number = req.body.number
        try {
            const result = await sequelize.transaction(async (t) => {
                const phones = await db.CellPhone.findAll({
                    where: {
                        ExtractionId: id
                    }
                })
                for (let index = 0; index < phones.length; index++) {
                    if (phones[index].deviceNumber > number) {
                        phones[index].deviceNumber = (phones[index].deviceNumber) - 1
                        await phones[index].save({ transaction: t })
                    }
                }
                res.status(200).send({ message: "Actualizado correctamente" })
            })
        } catch (e) {
            res.status(400).send({ message: "error" })
        }
    },
    getFilebyUserId: async (req, res) => {

        const userId = req.params.id
        const files = await db.File.findAll(
            {
                include: [
                    {
                        model: db.Technician, where: {
                            UserId: userId
                        }
                    },
                    {
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
                ]
            }
        )
        res.status(200).send(files)
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