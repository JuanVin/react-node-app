
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
                return { info: extractionNumber.id, message: "Creado correctamente" }
            })
            return result
        } catch (err) {
            throw err
        }
    },
    getExtractionDevices: async (id) => {
        try {
            const result = await sequelize.transaction(async (t) => {
                const info = await db.Extraction.findOne(
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
                return info
            })
            return result
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
                    }
                    else if (body.info.type === 2) {
                        const notebook = await db.Notebook.findByPk(body.id, { transaction: t })
                        const disks = await notebook.getDisks({ transaction: t })
                        const batteries = await notebook.getNoteBatteries({ transaction: t })
                        for (let x of batteries) {
                            await x.destroy({ transaction: t })
                        }
                        for (let x of disks) {
                            await x.destroy({ transaction: t })
                        }
                        await notebook.destroy({ transaction: t })
                    }
                    else {
                        const desktop = await db.Desktop.findByPk(body.id, { transaction: t })
                        const disks = await desktop.getDisks({ transaction: t })
                        for (let x of disks) {
                            await x.destroy({ transaction: t })
                        }
                        await desktop.destroy({ transaction: t })
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
        let phone
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
            return { data, message: "Cargado ok" }
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
                    if (await validate(info.deviceNumber, info.extractionId)) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
                phone.deviceNumber = info.deviceNumber
                phone.brand = device.brand
                phone.model = device.model
                phone.detail = device.detail
                phone.extraction = device.extraction
                for (let x of imei) {
                    if (x.remove) {
                        if (x.id) {
                            await db.Imei.destroy({ where: { id: x.id } }, { transaction: t })
                        }
                    }
                    else if (imei[index].id) {
                        await sequelize.query(`UPDATE imeis SET number='${x.number}' WHERE id='${x.id}'`, { transaction: t })
                    } else {
                        await phone.createImei(x, { transaction: t })
                    }
                }
                for (let x of simcard) {
                    if (x.remove) {
                        if (simcard[index].id) {
                            await db.Battery.destroy({ where: { id: x.id } }, { transaction: t })
                        }
                    }
                    else if (simcard[index].id) {
                        await sequelize.query(`UPDATE simcards SET company='${x.company}', number='${x.number}' WHERE id='${x.id}'`, { transaction: t })
                    } else {
                        await phone.createSimcard(x, { transaction: t })
                    }
                }
                for (let x of battery) {
                    if (x.remove) {
                        if (x.id) {
                            await db.Battery.destroy({ where: { id: x.id } }, { transaction: t })
                        }
                    }
                    else if (battery[index].id) {
                        await sequelize.query(`UPDATE batteries SET brand='${x.brand}', model='${x.model}', integrated='${x.integrated ? 1 : 0}' WHERE id='${x.id}'`, { transaction: t })
                    }
                    else {
                        await phone.createBattery(x, { transaction: t })
                    }
                }
                for (let x of microsd) {
                    if (x.remove) {
                        if (x.id) {
                            await db.Battery.destroy({ where: { id: x.id } }, { transaction: t })
                        }
                    }
                    else if (x.id) {
                        await sequelize.query(`UPDATE microsds SET type='${x.type}', capacity='${x.capacity}' WHERE id='${x.id}'`, { transaction: t })
                    } else {
                        await phone.createMicrosd(x, { transaction: t })
                    }
                }
                await phone.save({ transaction: t })
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

            return { data, message: "Actualizado correctamente", reload: reload }
        } catch (err) {
            throw err
        }
    },
    newDesktop: async (body) => {
        const { device, disk, info } = body
        let desktop, reload
        try {
            const results = await sequelize.transaction(async (t) => {
                reload = device.origin !== info.deviceNumber
                if (reload) {
                    if (await validate(info.deviceNumber, info.extractionId)) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
                desktop = await db.Desktop.create({
                    model: device.model,
                    brand: device.brand,
                    sn: device.sn,
                    detail: device.detail,
                    type: info.type,
                    deviceNumber: info.deviceNumber,
                    ExtractionId: info.extractionId
                }, { transaction: t })
                for await (let x of disk) {
                    await desktop.createDisk(x, { transaction: t })
                }
            })

            const data = await db.Desktop.findByPk(desktop.id,
                {
                    include: { model: db.Disk, attributes: { exclude: ["createdAt", "updatedAt"] } },
                })

            return { data, message: "Cargado correctamente", reload: reload }
        }
        catch (err) {
            console.log(err)
            throw err
        }
    },
    updateDesktop: async (body) => {
        const { device, disk, info } = body
        let desktop, reload
        try {
            const results = await sequelize.transaction(async (t) => {
                desktop = await db.Desktop.findByPk(device.id)
                reload = desktop.deviceNumber !== info.deviceNumber
                if (reload) {
                    if (await validate(info.deviceNumber, info.extractionId) === true) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
                desktop.model = device.model
                desktop.brand = device.brand
                desktop.sn = device.sn
                desktop.detail = device.detail
                desktop.deviceNumber = info.deviceNumber
                for (let x of disk) {
                    if (x.remove) {
                        if (x.id) {
                            await db.Disk.destroy({ where: { id: x.id } }, { transaction: t })
                        }
                    }
                    else if (x.id) {
                        await sequelize.query(`UPDATE disks SET brand='${x.brand}', model='${x.model}', sn='${x.sn}', capacity='${x.capacity}' WHERE id='${x.id}'`, { transaction: t })
                    } else {
                        await desktop.createDisk(x, { transaction: t })
                    }
                }
                await desktop.save({ transaction: t })
            })
            const data = await db.Desktop.findByPk(desktop.id, {
                include:
                    [
                        { model: db.Disk, attributes: { exclude: ["createdAt, updatedAt"] } }
                    ]
                ,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            return { data, message: "Actualizado correctamente", reload: reload }
        }
        catch (err) {
            throw err
        }
    },
    newNotebook: async (body) => {
        const { device, disk, battery, info } = body
        let notebook, reload

        try {
            const results = await sequelize.transaction(async (t) => {
                reload = device.origin !== info.deviceNumber
                if (reload) {
                    console.log(reload)
                    if (await validate(info.deviceNumber, info.extractionId)) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
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
            const data = await db.Notebook.findByPk(notebook.id,
                {
                    include: [
                        { model: db.NoteBattery, attributes: { exclude: ["updatedAt", "createdAt"] } },
                        { model: db.Disk, attributes: { exclude: ["updatedAt", "createdAt"] } }
                    ]
                }
            )
            return { data, message: "Cargado correctamente", reload: reload }
        }
        catch (err) {
            throw err
        }
    },
    updateNotebook: async (body) => {
        const { device, disk, battery, info } = body
        let notebook, reload
        try {
            const results = await sequelize.transaction(async (t) => {
                notebook = await db.Notebook.findByPk(device.id)
                reload = notebook.deviceNumber !== info.deviceNumber
                if (reload) {
                    if (await validate(info.deviceNumber, info.extractionId) === true) {
                        throw ({ status: 422, message: `Número (${info.deviceNumber}) de dispositivo ya ocupado` })
                    }
                }
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
            const data = await db.Notebook.findByPk(notebook.id,
                {
                    include: [
                        { model: db.NoteBattery, attributes: { exclude: ["updatedAt", "createdAt"] } },
                        { model: db.Disk, attributes: { exclude: ["updatedAt", "createdAt"] } }
                    ]
                }
            )
            return { data, message: "Cargado correctamente", reload: reload }
        }
        catch (err) {
            console.log(err)
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