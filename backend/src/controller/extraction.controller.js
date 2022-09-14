const db = require("../models/index")
const sequelize = db.sequelize
const extractionService = require("../services/extraction.service")

const extractionController = {
    createExtraction: async (req, res) => {
        try {
            res.status(200).send(await extractionService.createExtraction(req.body))
        } catch (err) {

            res.status(400).send({ message: err })
        }
    },
    getExtractionDevices: async (req, res) => {
        try {
            const info = await extractionService.getExtractionDevices(req.params.id)
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
                    res.status(201).send(await extractionService.newPhone(body))
                } catch (err) {
                    res.status(500).send({ message: err.message })

                }
                break;
            case 2:
                try {

                    res.status(200).send(await extractionService.newNotebook(body))
                } catch (err) {
                    res.status(500).send(err)
                }

                break;
            case 3:
                try {
                    res.status(200).send(await extractionService.newDesktop(body))
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
                    res.status(201).send(await extractionService.updatePhone(body))
                } catch (err) {
                    res.status(err.status ? err.status : 500).send({ message: err.message })
                }
                break;
            case 2:
                try {
                    await extractionService.updateNotebook(body)
                    res.status(200).send(await extractionService.updateNotebook(body))
                } catch (err) {
                    console.log(err)
                    res.status(err.status ? err.status : 500).send({ message: err.message })
                }
                break;
            case 3:
                try {
                    res.status(200).send(await extractionService.updateDesktop(body))
                } catch (err) {
                    res.status(err.status ? err.status : 500).send({ message: err.message })
                }
                break;
            default:
                break;
        }
    },
    deleteDevice: async (req, res) => {
        try {
            res.status(200).send(await extractionService.deleteDevice(req.body))
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }
}

module.exports = extractionController