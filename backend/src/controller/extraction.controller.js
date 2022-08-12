const db = require("../models/index")
const sequelize = db.sequelize
const extractionService = require("../services/extraction.service")

const extractionController = {
    newExtraction: async (req, res) => {
        let body = req.body
        try {
            /*
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
            })*/
            const extraction = await extractionService.newExtraction(body)
            res.status(200).send({ message: "Extracción cargada con éxito", device: extraction })
        } catch (e) {
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
        console.log("asdadasd")
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
    }
}

module.exports = extractionController