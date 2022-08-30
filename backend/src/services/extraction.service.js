
const db = require("../models/index")
const sequelize = db.sequelize
module.exports = extractionService = {

    createExtraction: async (body) => {
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
                        include: [
                            {
                                model: db.CellPhone, include: [
                                    { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                    { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                    { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                    { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                                ],
                            },
                            { model: db.Desktop, include: { model: db.Disk, attributes: { exclude: ["createdAt", "updatedAt"] } } },
                            {
                                model: db.Notebook, include: [
                                    { model: db.Disk, attributes: { exclude: ["createdAt", "updatedAt"] } },
                                    { model: db.NoteBattery, attributes: { exclude: ["createdAt", "updatedAt"] } },
                                ]
                            }
                        ]

                    }, { transaction: t }
                )
            })
            return info
        } catch (err) {
            console.log(err)
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
                    ExtractionId: info.extractionId,
                    type: info.type
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
            const data = await db.CellPhone.findByPk(phone.id,
                {
                    include: [
                        { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    ]
                })
            return { data, message: "Cargado correctamente" }
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
            const data = await db.CellPhone.findByPk(phone.id,
                {
                    include: [
                        { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt"] } },
                    ]
                })
            return { data, message: "Actualizado correctamente" }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    newDesktop: async (body) => {
        const { device, disk, info } = body
        let desktop
        try {
            const results = await sequelize.transaction(async (t) => {
                desktop = await db.Desktop.create({
                    model: device.model,
                    brand: device.brand,
                    sn: device.sn,
                    detail: device.detail,
                    type: info.type,
                    deviceNumber: info.deviceNumber,
                    ExtractionId: info.extractionId
                }, { transaction: t })
                for (let index = 0; index < disk.length; index++) {
                    await desktop.createDisk(disk[index], { transaction: t })
                }
            })
        }
        catch (err) {
            throw err
        }
        console.log("pc")
    },
    updateDesktop: async (body) => {
        const { device, disk, info } = body
        let desktop
        try {
            const results = await sequelize.transaction(async (t) => {
                desktop = await db.Desktop.findByPk(device.id)
                desktop.model = device.model
                desktop.brand = device.brand
                desktop.sn = device.sn
                desktop.detail = device.detail
                desktop.deviceNumber = device.deviceNumber
                for (let index = 0; index < disk.length; index++) {
                    if (disk[index].id) {
                        await sequelize.query(`UPDATE disks SET brand='${disk[index].brand}', model='${disk[index].model}', sn='${disk[index].sn}', capacity='${disk[index].capacity}' WHERE id='${disk[index].id}'`, { transaction: t })
                    } else {
                        await desktop.createDisk(disk[index], { transaction: t })
                    }
                }
                await desktop.save({ transaction: t })
            })
        }
        catch (err) {
            throw err
        }
    },
    newNotebook: async (body) => {
        const { device, disk, battery, info } = body
        let notebook
        try {
            const results = await sequelize.transaction(async (t) => {
                notebook = await db.Notebook.create({
                    model: device.model,
                    brand: device.brand,
                    sn: device.sn,
                    detail: device.detail,
                    type: info.type,
                    deviceNumber: info.deviceNumber,
                    ExtractionId: info.extractionId
                }, { transaction: t })
                for (let index = 0; index < disk.length; index++) {
                    await notebook.createDisk(disk[index], { transaction: t })
                }
                for (let index = 0; index < disk.length; index++) {
                    await notebook.createNoteBattery(battery[index], { transaction: t })
                }
            })
        }
        catch (err) {
            throw err
        }
    },
    updateNotebook: async (body) => {
        const { device, disk, battery, info } = body
        let notebook
        try {
            const results = await sequelize.transaction(async (t) => {

                notebook = await db.Notebook.findByPk(device.id)
                notebook.model = device.model
                notebook.brand = device.brand
                notebook.sn = device.sn
                notebook.detail = device.detail
                notebook.deviceNumber = info.deviceNumber

                for (let index = 0; index < disk.length; index++) {
                    if (disk[index].id) {
                        await sequelize.query(`UPDATE disks SET brand='${disk[index].brand}', model='${disk[index].model}', sn='${disk[index].sn}', capacity='${disk[index].capacity}' WHERE id='${disk[index].id}'`, { transaction: t })
                    } else {
                        await notebook.createDisk(disk[index], { transaction: t })
                    }
                }

                for (let index = 0; index < battery.length; index++) {
                    if (battery[index].id) {
                        await sequelize.query(`UPDATE notebatteries SET brand='${battery[index].brand}', model='${battery[index].model}', sn='${battery[index].sn}' WHERE id='${battery[index].id}'`, { transaction: t })
                    } else {
                        await notebook.createNoteBattery(battery[index], { transaction: t })
                    }
                }
                await notebook.save({ transaction: t })
            })
        }
        catch (err) {
            throw err
        }
    }
}
