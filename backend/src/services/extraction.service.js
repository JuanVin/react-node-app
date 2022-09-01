
const db = require("../models/index")
const sequelize = db.sequelize
const { Op } = require("sequelize");
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

    deleteDevice: async (body) => {

        try {

            const result = await sequelize.transaction(async (t) => {
                if (body.id) {
                    if (body.info.type === 1) {
                        await db.CellPhone.destroy({ where: { id: body.id } }, { transaction: t })
                        console.log("1")
                    }
                    else if (body.info.type === 2) {
                        await db.Notebook.destroy({ where: { id: body.id } }, { transaction: t })
                    }
                    else {
                        await db.Desktop.destroy({ where: { id: body.id } }, { transaction: t })
                    }
                }
                return { message: "Eliminado correctamente", reload: true }
            })
            return result
        } catch (err) {
            throw err
        }
    },
    newPhone: async (body) => {
        const { device, imei, simcard, battery, microsd, info } = body
        let phone, data
        try {
            const results = await sequelize.transaction(async (t) => {
                if (await validate(info.deviceNumber, info.extractionId) === true) {
                    throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                }
                phone = await db.CellPhone.create({
                    deviceNumber: info.deviceNumber,
                    brand: device.brand,
                    model: device.model,
                    detail: device.detail,
                    extraction: device.extraction,
                    ExtractionId: info.extractionId,
                    type: info.type
                }, { transaction: t })
                for (let x of simcard) {
                    await phone.createSimcard(x, { transaction: t })
                }
                for (let x of imei) {
                    await phone.createImei(x, { transaction: t })
                }
                for (let x of battery) {
                    await phone.createBattery(x, { transaction: t })
                }
                for (let x of microsd) {
                    await phone.createMicrosd(x, { transaction: t })
                }
            })
            const data = await db.CellPhone.findByPk(phone.id,
                {
                    include: [
                        { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                        { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                        { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                        { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                    ]
                })
            return { data, message: "Cargado correctamente" }
        } catch (err) {
            throw err
        }
    },
    updatePhone: async (body) => {
        const { device, imei, simcard, battery, microsd, info } = body
        let phone, reload
        try {
            const results = await sequelize.transaction(async (t) => {
                phone = await db.CellPhone.findByPk(device.id)
                reload = phone.deviceNumber !== info.deviceNumber
                if (reload) {
                    if (await validate(info.deviceNumber, info.extractionId) === true) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
                phone.deviceNumber = info.deviceNumber
                phone.brand = device.brand
                phone.model = device.model
                phone.detail = device.detail
                phone.extraction = device.extraction
                for (let index = 0; index < imei.length; index++) {
                    if (imei[index].remove) {
                        if (imei[index].id) {
                            await db.Imei.destroy({ where: { id: imei[index].id } }, { transaction: t })
                        }
                    }
                    else if (imei[index].id) {
                        await sequelize.query(`UPDATE imeis SET number='${imei[index].number}' WHERE id='${imei[index].id}'`, { transaction: t })
                    } else {
                        await phone.createImei(imei[index], { transaction: t })
                    }
                }
                for (let index = 0; index < simcard.length; index++) {
                    if (simcard[index].remove) {
                        if (simcard[index].id) {
                            await db.Battery.destroy({ where: { id: simcard[index].id } }, { transaction: t })
                        }
                    }
                    else if (simcard[index].id) {
                        await sequelize.query(`UPDATE simcards SET company='${simcard[index].company}', number='${simcard[index].number}' WHERE id='${simcard[index].id}'`, { transaction: t })
                    } else {
                        await phone.createSimcard(simcard[index], { transaction: t })
                    }
                }
                for (let index = 0; index < battery.length; index++) {
                    if (battery[index].remove) {
                        if (battery[index].id) {
                            await db.Battery.destroy({ where: { id: battery[index].id } }, { transaction: t })
                        }
                    }
                    else if (battery[index].id) {
                        await sequelize.query(`UPDATE batteries SET brand='${battery[index].brand}', model='${battery[index].model}', integrated='${battery[index].integrated ? 1 : 0}' WHERE id='${battery[index].id}'`, { transaction: t })
                    }
                    else {
                        await phone.createBattery(battery[index], { transaction: t })
                    }
                }
                for (let index = 0; index < microsd.length; index++) {
                    if (microsd[index].remove) {
                        if (microsd[index].id) {
                            await db.Battery.destroy({ where: { id: battery[index].id } }, { transaction: t })
                        }
                    }
                    else if (microsd[index].id) {
                        await sequelize.query(`UPDATE microsds SET type='${microsd[index].type}', capacity='${microsd[index].capacity}' WHERE id='${microsd[index].id}'`, { transaction: t })
                    } else {
                        await phone.createMicrosd(microsd[index], { transaction: t })
                    }
                }
                await phone.save({ transaction: t })
                const data = await db.CellPhone.findByPk(phone.id,
                    {
                        include: [
                            { model: db.Battery, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Microsd, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Imei, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                            { model: db.Simcard, attributes: { exclude: ["createdAt", "updatedAt", "CellPhoneId"] } },
                        ]
                    })
                console.log(reload)
                return { data, message: "Actualizado correctamente", reload: reload }
            })
            return results
        } catch (err) {
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

const validate = async (deviceNumber, extractionId) => {
    const extraction = await db.Extraction.findByPk(extractionId)
    const phone = await extraction.getCellPhones({
        where: {
            deviceNumber: deviceNumber
        }
    })
    const desktop = await extraction.getDesktops({
        where: {
            deviceNumber: deviceNumber
        }
    })
    const notebook = await extraction.getNotebooks({
        where: {
            deviceNumber: deviceNumber
        }
    })

    if (phone.length > 0 || desktop.length > 0 || notebook.length > 0) return true

    return false
}   