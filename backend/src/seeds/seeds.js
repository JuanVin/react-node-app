require('dotenv').config()
const sequelize = require('../database/db')
const fiscalUnit = require('../models/FiscalUnit')
const condition = require('../models/Condition')
const fiscalOffice = require('../models/FiscalOffice')
const technician = require('../models/Technical')
const district = require('../models/District')
const type = require('../models/FileType')
const dist = [{
    name: "1ra circunscripcion"
},
{
    name: "2da circunscripcion"
},
{
    name: "3ra circunscripcion"
},
{
    name: "4ta circunscripcion"
}
]
const types = [{
    type: "p"
},
{
    type: "p2"
},
{
    type: "t"
},
{
    type: "sum"
}
]
const unit = [{
    name: "homicidios",
    condition: true,
    DistrictId: 1
},
{
    name: "violencia genero",
    condition: true,
    DistrictId: 1
},
{
    name: "correccional",
    condition: true,
    DistrictId: 1
},
{
    name: "delitos economicos",
    condition: true,
    DistrictId: 1
},
{
    name: "delitos informaticos",
    condition: true,
    DistrictId: 1
},
{
    name: "integridad sexual",
    condition: true,
    DistrictId: 1
},
{
    name: "robos, hurtos y sustraccion automotores",
    condition: true,
    DistrictId: 1
},
{
    name: "automotores",
    condition: false,
    DistrictId: 1
},
{
    name: "delitos no especializados",
    condition: true,
    DistrictId: 1
},
{
    name: "valle de uco",
    condition: true,
    DistrictId: 4
},
{
    name: "san rafael",
    condition: true,
    DistrictId: 2
},
{
    name: "malargue",
    condition: true,
    DistrictId: 2
},
{
    name: "alvear",
    condition: true,
    DistrictId: 2
},
{
    name: "especial",
    condition: false,
    DistrictId: 1
},
{
    name: "no especializados",
    condition: true,
    DistrictId: 1
},
{
    name: "san martin",
    condition: true,
    DistrictId: 3
},
{
    name: "santa rosa",
    condition: true,
    DistrictId: 3
},
{
    name: "rivadavia-junin",
    condition: true,
    DistrictId: 3
},
{
    name: "maipu-lujan",
    condition: true,
    DistrictId: 1
},
{
    name: "capital",
    condition: false,
    DistrictId: 1
},
{
    name: "godoy cruz",
    condition: false,
    DistrictId: 1
},
{
    name: "guaymallen",
    condition: false,
    DistrictId: 1
},
{
    name: "flagrancia",
    condition: false,
    DistrictId: 1
},
{
    name: "las heras",
    condition: true,
    DistrictId: 1
},
{
    name: "tunuyan",
    condition: true,
    DistrictId: 4
},
{
    name: "correccional",
    condition: true,
    DistrictId: 2
},
{
    name: "transito",
    condition: true,
    DistrictId: 2
},
{
    name: "fiscalia penal de menores",
    condition: true,
    DistrictId: 2
},
{
    name: "violencia de genero y sexuales",
    condition: true,
    DistrictId: 2
},
{
    name: "santa rosa - la paz",
    condition: true,
    DistrictId: 3
},
{
    name: "correccional",
    condition: true,
    DistrictId: 3
},
{
    name: "menores y transito",
    condition: true,
    DistrictId: 3
},
{
    name: "violencia genero",
    condition: true,
    DistrictId: 3
}
    ,
{
    name: "menores y transito",
    condition: true,
    DistrictId: 4
}

],
    conditions = [
        { condition: "turno otorgado" },
        { condition: "falta comenzar" },
        { condition: "falta terminar" },
        { condition: "falta entregar" },
        { condition: "archivado" },
        { condition: "se cae turno" },
        { condition: "sin efecto" },
        { condition: "observacion" },
    ],
    office = [
        { name: "oficina fiscal 1" },
        { name: "oficina fiscal 2" },
        { name: "oficina fiscal 3" },
        { name: "oficina fiscal 4" },
        { name: "oficina fiscal 5" },
        { name: "oficina fiscal 6" },
        { name: "oficina fiscal 7" },
        { name: "oficina fiscal 8" },
        { name: "oficina fiscal 9" },
        { name: "oficina fiscal 10" },
        { name: "oficina fiscal 11" },
        { name: "oficina fiscal 12" },
        { name: "oficina fiscal 13" },
        { name: "oficina fiscal 14" },
        { name: "oficina fiscal 15" },
        { name: "oficina fiscal 16" },
        { name: "oficina fiscal 17" },
        { name: "oficina fiscal 18" },
        { name: "oficina fiscal 19" },
        { name: "oficina fiscal rivadavia" },
        { name: "oficina fiscal junin" },
        { name: "oficina fiscal cordon del plata" },
        { name: "oficina fiscal la paz" },
        { name: "oficina fiscal malargue" },
        { name: "oficina fiscal palmira" },
        { name: "oficina fiscal san carlos" },
        { name: "oficina fiscal san martin" },
        { name: "oficina fiscal vista martin" },
        { name: "oficina fiscal santa rosa" },
        { name: "comisaria 15" },
        { name: "comisaria 18" },
        { name: "comisaria 20" },
        { name: "comisaria 24" },
        { name: "comisaria 32" },
        { name: "comisaria 38" },
        { name: "comisaria 41" },
        { name: "comisaria 42" },
        { name: "comisaria 65" },
        { name: "comisaria 8" },
    ],
    technicians = [
        { name: "jv" },
        { name: "sg" },
        { name: "lo" },
        { name: "cn" },
        { name: "jp" },
        { name: "fb" }
    ]

const tech =
    sequelize.sync({ force: false })
        .then(() => {
            dist.forEach(item => district.create(item))
            unit.forEach(item => fiscalUnit.create(item))
            conditions.forEach(item => condition.create(item))
            office.forEach(item => fiscalOffice.create(item))
            technicians.forEach(item => technician.create(item))
            types.forEach(item => type.create(item))
        })