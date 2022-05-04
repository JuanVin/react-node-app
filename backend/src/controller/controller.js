const sequelize = require('../database/db')
const fiscalUnit = require('../models/FiscalUnit')
const fiscalOffice = require('../models/FiscalOffice')
const technician = require('../models/Technical')
const noIndexItem = require('../models/NoIndexFiles')
const files = require('../models/File')
module.exports = controller = {
    getFiles: async (req, res) => {   
        let units = await fiscalUnit.findAll(),
            office = await fiscalOffice.findAll(),
            technicians = await technician.findAll(),
            noIndex = await noIndexItem.findAll(),
            data = []
        
        data.push(await files.findAll())
        data.push(noIndex)
        res.send(data)
    },
    getFileById: (req, res) => {
    }
}