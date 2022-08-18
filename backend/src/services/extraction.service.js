
const db = require("../models/index")
const sequelize = db.sequelize

module.exports = extractionService = {
    newExtraction: async (body) => {
        try {
            let extraction
            const results = await sequelize.transaction(async (t) => {
                extraction =
                    await db.CellPhone.create({
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
            })
            return extraction
        }
        catch (err) {
            return err
        }
    },
    updateExtraction: async (body) => {
        try {
            let extraction, extraction2
            const result = await sequelize.transaction(async (t) => {
                extraction = await db.CellPhone.findByPk(body.phoneId, { transaction: t })
                if (extraction.deviceNumber !== body.device) {
                    extraction2 = await db.CellPhone.findOne({
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
            })
            return extraction
        } catch (err) {
            throw err
        }
    },
    setExtractionNumber: async (body) => {
        const { fileId, numberOfDevices } = body
        try {
            let extractionNumber
            const result = await sequelize.transaction(async (t) => {
                extractionNumber = await db.Extraction.create(
                    {
                        numberOfDevices: numberOfDevices,
                        FileId: fileId
                    }, { transaction: t })
            })
            return extractionNumber
        } catch (err) {
            throw err
        }
    },
    getExtractionInfo: async (id) => {
        try {
            let info
            const result = await sequelize.transaction(async (t) => {
                info = await db.Extraction.findOne(
                    {
                        where: {
                            FileId: id
                        },
                        include: [db.CellPhone]
                    }, { transaction: t }
                )
            })
            return info
        } catch (err) {
            throw err
        }
    },
    updateExtractionNumber: async (body) => {
        const { id, number } = body
        try {
            const result = sequelize.transaction(async (t) => {
                const response = await db.Extraction.findOne({
                    where: {
                        FileId: id
                    }
                }, { transaction: t })
                response.numberOfDevices = number
                await response.save({ transaction: t })
            })
        } catch (err) {
            throw err
        }
    }
}

