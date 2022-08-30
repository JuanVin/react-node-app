const db = require("../models/index")
const sequelize = db.sequelize
const extractionService = require("../services/extraction.service")

const extractionController = {
    createExtraction: async (req, res) => {
        try {
            const extractionNumber = await extractionService.createExtraction(req.body)
            res.status(200).send({ message: "ok", info: extractionNumber.id })
        } catch (err) {

            res.status(400).send({ message: err })
        }
    },
    getExtractionInfo: async (req, res) => {
        try {
            const info = await extractionService.getExtractionInfo(req.params.id)
            if (info) {
                res.status(200).send(info)
            } else {
                res.status(404).send({ message: "no hallado" })
            }
        } catch (err) {
            res.status(400).send({ message: err })
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
                        },
                        include: [
                            { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                        ]
                    },
                    { transaction: t }
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
            const extraction = await extractionService.updateExtraction(body)
            res.status(200).send({ message: "Extracción actualizada con éxito", device: extraction })
        } catch (error) {
            res.status(400).send({ message: "Ocurrió un error", detail: null })
        }
    },
    updateExtractionNumber: async (req, res) => {
        try {
            const response = await extractionService.updateExtractionNumber(req.body)
            res.status(200).send({ message: "ok" })
        } catch (err) {
            res.status(400).send({ message: err })
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
    newDevice: async (req, res) => {

        const body = req.body

        switch (body.info.type) {
            case 1:
                try {
                    res.status(200).send(await extractionService.newPhone(body))
                } catch (err) {
                    res.status(500).send(err)
                }
                break;
            case 2:
                try {
                    await extractionService.newNotebook(body)
                    res.status(200).send({ message: "Cargado correctamente" })
                } catch (err) {
                    res.status(500).send(err)
                }

                break;
            case 3:
                try {
                    await extractionService.newDesktop(body)
                    res.status(200).send({ message: "Cargado correctamente" })
                } catch (err) {
                    res.status(500).send(err)
                }
                break;
            default:
                break;
        }
    },
    updateDevice: async (req, res) => {
        const body = req.body
        switch (body.info.type) {
            case 1:
                try {
                    res.status(200).send(await extractionService.updatePhone(body))
                } catch (err) {
                    res.status(500).send({ message: err })
                }
                break;
            case 2:
                try {
                    await extractionService.updateNotebook(body)
                    res.status(200).send({ message: "Cargado correctamente" })
                } catch (err) {
                    res.status(500).send({ message: err })
                }
                break;
            case 3:
                try {
                    await extractionService.updateDesktop(body)
                    res.status(200).send({ message: "Cargado correctamente" })
                } catch (err) {
                    res.status(500).send({ message: err })
                }
                break;
            default:
                break;
        }
    },
    deleteDevice: async (req, res) => {
        const body = req.body
        console.log(body)
        switch (body.info.type) {
            case 1:
                try {
                    res.status(200).send(await extractionService.deletePhone(body.id, body.info.extractionId))
                } catch (err) {
                    res.status(500).send(err)
                }
                break;
            case 2:
                await extractionService.newNotebook(body)
                break;
            case 3:
                await extractionService.newDesktop(body)
                break;
            default:
                break;
        }
    }
}

module.exports = extractionController