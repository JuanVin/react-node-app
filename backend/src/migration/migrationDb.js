require('dotenv').config()
const csv = require('csv-parser');
const fs = require('fs');
const sequelize = require('../database/db');
const condition = require('../models/Condition')
const fiscalOffice = require('../models/FiscalOffice')
const fiscalUnit = require('../models/FiscalUnit')
const noIndexItems = require('../models/NoIndexFiles')
const file = require('../models/File');
const dates = require('../models/FileDate')
const technician = require('../models/Technical');
const detail = require('../models/Detail')
const type = require('../models/FileType')
const data = []

let off,
    unit

fs.createReadStream(__dirname + '/list.csv')
    .pipe(csv({}))
    .on('data', (row) => {
        data.push(row)
    })
    .on('end', () => {
        migrateDB()
    })

let migrateDB = async() => {
    let oficinas = [],
        unidades = []
    await loadData()
    for (const item of data) {
        if (await officeComparator(item.office)) {
            oficinas.push(item)
        } else if (await unitComparator(item.office)) {
            unidades.push(item)
        } else {
            item.shift_date = convertToDate(item.shift_date)
            item.admission_date = convertToDate(item.admission_date)
            item.egress_date = convertToDate(item.egress_date)
            noIndexItems.create(item)
        }
    }
    officeToSql(oficinas, false)
    officeToSql(unidades, true)
}


let officeComparator = async(office) => {
    for (const o of off) {
        if (o.name === office) {
            return true
        }
    }
    return false
}

let unitComparator = async(office) => {
    for (const u of unit) {
        if (u.name === office) {
            return true
        }
    }
    return false
}

let loadData = async() => {
    off = await fiscalOffice.findAll()
    unit = await fiscalUnit.findAll()
    technicians = await technician.findAll()
    conditions = await condition.findAll()
    types = await type.findAll()
}

function convertToDate(dateString) {

    let d, dat
    if (dateString === "") dat = null
    else if (!dateString.includes('/')) dat = null
    else {
        d = dateString.split("/");
        dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    }
    return dat;

}
officeToSql = async(oficinas, option) => {
    let dato, datos, datosExpediente, expediente
    for (const oficina of oficinas) {
        datos = {
            shift_date: oficina.shift_date = convertToDate(oficina.shift_date),
            admission_date: oficina.admission_date = convertToDate(oficina.admission_date),
            egress_date: oficina.egress_date = convertToDate(oficina.egress_date)
        }
        dato = await dates.create(datos)
        if (option) {
            datosExpediente = {
                file_number: oficina.file_number.replace("p", "").replace("t","").replace("-", ""),
                shift_granted: oficina.shift_granted,
                FileDateId: dato.id,
                FiscalOfficeId: null,
                FiscalUnitId: getUnitId(oficina.office),
                TechnicalId: getTechId(oficina.technical),
                ConditionId: getConditionId(oficina.condition),
                FileTypeId: getTypeId(oficina.type)
            }
        } else {
            datosExpediente = {
                file_number: oficina.file_number.replace("p", "").replace("t","").replace("-", ""),
                shift_granted: oficina.shift_granted,
                FileDateId: dato.id,
                FiscalOfficeId: getOfficeId(oficina.office),
                FiscalUnitId: null,
                TechnicalId: getTechId(oficina.technical),
                ConditionId: getConditionId(oficina.condition),
                FileTypeId: getTypeId(oficina.type)
            }
        }
        expediente = await file.create(datosExpediente)
        detail.create({
            detail: oficina.detail,
            FileId: expediente.id
        })
    }
}
getOfficeId = (office) => {
    let id
    for (const o of off) {
        if (o.name === office) {
            return o.id
        }
    }
    return null
}
getUnitId = (office) => {
    for (const u of unit) {
        if (u.name === office) {
            return u.id
        }
    }
    return null
}
getTechId = (tech) => {
    for (const t of technicians) {
        if (t.name === tech) {
            return t.id
        }
    }
    return null
}
getConditionId = (cond) => {
    for (const c of conditions) {
        if (c.condition === cond) {
            return c.id
        }
    }
    return null
}
getTypeId = (t) => {
    for (const item of types) {
        if (item.type === t) {
            return item.id
        }
    }
    return null
}