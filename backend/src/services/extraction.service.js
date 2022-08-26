
const { Sequelize, transaction } = require("../database/db")
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
                        include: {
                            model: db.CellPhone, include: [
                                { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            ]
                        }
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
    },
    deletePhone: async (id, extractionId) => {
        try {
            const results = await sequelize.transaction(async (t) => {
                if (id) {
                    const phone = await db.CellPhone.findByPk(id, { transaction: t })
                    await phone.destroy({ transaction: t })
                }
                const extraction = await db.Extraction.findByPk(extractionId, { transaction: t })
                extraction.numberOfDevices = extraction.numberOfDevices - 1
                await extraction.save({ transaction: t })
            })
            return { message: "Eliminado correctamente" }
        } catch (err) {
            throw err
        }
    },
    newPhone: async (body) => {
        const { device, imei, simcard, battery, microsd, info } = body
        let phone, data

        try {
            const results = await sequelize.transaction(async (t) => {
                phone = await db.CellPhone.create({
                    deviceNumber: info.deviceNumber,
                    brand: device.brand,
                    model: device.model,
                    detail: device.detail,
                    extraction: device.extraction,
                    ExtractionId: info.extractionId
                }, { transaction: t })
                for (let index = 0; index < simcard.length; index++) {
                    await phone.createSimcard(simcard[index], { transaction: t })
                }
                for (let index = 0; index < imei.length; index++) {
                    await phone.createImei(imei[index], { transaction: t })
                }
                for (let index = 0; index < battery.length; index++) {
                    await phone.createBattery(battery[index], { transaction: t })
                }
                for (let index = 0; index < microsd.length; index++) {
                    await phone.createMicrosd(microsd[index], { transaction: t })
                }
            })
            data = await db.CellPhone.findByPk(phone.id, {
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: { all: true, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } }
            })
            return { data }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    updatePhone: async (body) => {
        const { device, imei, simcard, battery, microsd, info } = body
        let phone
        try {
            const results = await sequelize.transaction(async (t) => {
                phone = await db.CellPhone.findByPk(device.id)
                phone.deviceNumber = info.deviceNumber
                phone.brand = device.brand
                phone.model = device.model
                phone.detail = device.detail
                phone.extraction = device.extraction
                for (let index = 0; index < imei.length; index++) {
                    if (imei[index].id) {
                        if (imei[index].remove) {
                            await phone.removeImei(imei[index].id)
                        } else {
                            await sequelize.query(`UPDATE imeis SET number='${imei[index].number}' WHERE id='${imei[index].id}'`, { transaction: t })
                        }
                    } else {
                        await phone.createImei(imei[index], { transaction: t })
                    }
                }
                for (let index = 0; index < simcard.length; index++) {
                    if (simcard[index].id) {
                        if (simcard[index].remove) {
                            await phone.removeSimcard(simcard[index].id)
                        } else {
                            await sequelize.query(`UPDATE simcards SET company='${simcard[index].company}', number='${simcard[index].number}' WHERE id='${simcard[index].id}'`, { transaction: t })
                        }
                    } else {
                        await phone.createSimcard(simcard[index], { transaction: t })
                    }
                }
                for (let index = 0; index < battery.length; index++) {
                    if (battery[index].id) {
                        if (battery[index].remove) {
                            await phone.removeBattery(battery[index].id)
                        }
                        else {
                            await sequelize.query(`UPDATE batteries SET brand='${battery[index].brand}', model='${battery[index].model}' WHERE id='${battery[index].id}'`, { transaction: t })
                        }
                    } else {
                        await phone.createBattery(battery[index], { transaction: t })
                    }
                }
                for (let index = 0; index < microsd.length; index++) {
                    if (microsd[index].id) {
                        if (microsd[index].remove) {
                            await phone.removeMicrosd(microsd[index].id)
                        } else {
                            await sequelize.query(`UPDATE microsds SET type='${microsd[index].type}', capacity='${microsd[index].capacity}' WHERE id='${microsd[index].id}'`, { transaction: t })
                        }
                    } else {
                        await phone.createMicrosd(microsd[index], { transaction: t })
                    }
                }
                await phone.save({ transaction: t })
            })
            data = await db.CellPhone.findByPk(phone.id, {
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: { all: true, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } }
            })
            return { data }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    newDesktop: async (body) => {
        console.log(body)
        console.log("pc")
    },
    newNotebook: async (body) => {
        console.log("notebook")
    }
}
