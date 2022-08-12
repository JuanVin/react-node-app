
const db = require("../models/index")
const sequelize = db.sequelize

module.exports = extractionService = {
    newExtraction: async (body) => {
        try {
            const results = await sequelize.transaction(async (t) => {
                return (
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
                )
            })
        }
        catch (err) {
            return err
        }
    }
}

