require('dotenv').config()
const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv')
const fs = require('fs');
const sequelize = require('../src/database/db');
const technicians = require('../src/models/Technical')

let data = []
let data2 = [],
    test
const unidades = (oficina) => {
    switch (true) {
        case oficina.includes("robos") || oficina.includes("hurtos") || oficina.includes("ryh") || oficina.includes("r y h"):
            oficina = "robos, hurtos y sustraccion de automotores"
            break
        case oficina.includes("- a"):
            console.log("asdasd")
            oficina = "automotores"
            break
        case oficina.includes("genero") || oficina.includes("g�nero"):
            oficina = "violencia de genero"
            break
        case oficina.includes("informaticos") || oficina.includes("inform�ticos"):
            oficina = "delitos informaticos"
            break
        case oficina.includes("economico") || oficina.includes("econ�micos") || oficina.includes("ecomico"):
            oficina = "delitos economicos"
            break
        case oficina.includes("valle") || oficina.includes("uco"):
            oficina = "valle de uco"
            break
        case oficina.includes("homicidio") || oficina.includes("homicidos") || oficina.includes("homidicios"):
            oficina = "homicidios"
            break
        case oficina.includes("sexual") || oficina.includes("integridad"):
            oficina = "integridad sexual"
            break
        case oficina.includes("san rafael") || oficina.includes('rafel'):
            oficina = "san rafael"
            break
        case oficina.includes("malargue") || oficina.includes("malarg�e"):
            oficina = "malargue"
            break
        case oficina.includes("alvear"):
            oficina = "alvear"
            break
        case oficina.includes("especial"):
            if (oficina.includes("no")) oficina = "no especializados"
            else oficina = "especial"
            break
        case oficina.includes("san martín") || oficina.includes("san mart�n" || oficina.includes("martin") || oficina.includes("san martin")):
            oficina = "san martin"
            break
        case oficina.includes("santa") || oficina.includes("rosa"):
            oficina = "santa rosa"
            break
        case oficina.includes("rivadavia") || oficina.includes("junin") || oficina.includes("jun�n"):
            oficina = "rivadavia-junin"
            break
        case oficina.includes("maipú") || oficina.includes("maip�") || oficina.includes("maipu"):
            oficina = "maipu-lujan"
            break
        case oficina.includes("capital") || oficina.includes("captial"):
            oficina = "capital"
            break
        case oficina.includes("godoy") || oficina.includes("cruz"):
            oficina = "godoy cruz"
            break
        case oficina.includes("guayma") || oficina.includes("guayama"):
            oficina = "guaymallen"
            break
        case oficina.includes("flagrancia"):
            oficina = "flagrancia"
            break
        case oficina.includes("heras"):
            oficina.includes("las heras")
            break
        case oficina.includes("tunuyan"):
            oficina.includes("tunuyan")
            break
    }
    return oficina
}
const oficinas = (oficina) => {

    if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('15')) {
        oficina = "comisaria 15"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('20')) {
        oficina = "comisaria 20"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('32')) {
        oficina = "comisaria 32"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('65')) {
        oficina = "comisaria 65"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('42')) {
        oficina = "comisaria 42"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('18')) {
        oficina = "comisaria 18"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('38')) {
        oficina = "comisaria 38"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('41')) {
        oficina = "comisaria 41"
    } else if ((oficina.includes('comisar�a') || oficina.includes('comisaria') || oficina.includes('comisa') || oficina.includes('com')) && oficina.includes('24')) {
        oficina = "comisaria 24"
    }
    return oficina
}
const normalizar = (oficina) => {
    if (oficina.includes('(')) {
        oficina = oficina.replace('(', '').replace(')', '')
    }

    if (oficina.includes('nro')) {
        oficina = oficina.replace('nro', '')
    }
    if (oficina.includes(' de ')) {
        oficina = oficina.replace('de', '')
    }
    if (oficina.includes('n�') || oficina.includes('n°')) {
        oficina = oficina.replace('n�', '')
    }
    if (oficina.includes('  ') || oficina.includes('   ')) {
        if (oficina.includes('  ')) oficina = oficina.replace('  ', ' ')
        else oficina = oficina.replace('   ', ' ')
    }
    if (oficina.includes(',')) oficina.replace(',', '')
    if (oficina.includes('.')) {
        oficina = oficina.replace('.', '')
    }
    return oficina.trim()
}
const estados = (estado) => {
    if (estado.includes('pendiente')) {
        estado = estado.replace('pendiente', '')
    }
    return estado.trim()
}
const auxiliares = (auxiliar) => {
    switch (true) {
        case (auxiliar.includes('juan') && auxiliar.includes('pablo')) || auxiliar.includes('jp'):
            auxiliar = "jp"
            break
        case auxiliar.includes('vinci') || auxiliar.includes('jv'):
            auxiliar = "jv"
            break
        case auxiliar.includes('luis') || auxiliar.includes('oliva') || auxiliar.includes('lo'):
            auxiliar = "lo"
            break
        case auxiliar.includes('cristian') || auxiliar.includes('nieto') || auxiliar.includes('cn'):
            auxiliar = "cn"
            break
        case auxiliar.includes('sebastian') || auxiliar.includes('garcia') || auxiliar.includes('sg') || auxiliar.includes('seba'):
            auxiliar = "sg"
            break
        case auxiliar.includes('ezequiel') || auxiliar.includes('velasco') || auxiliar.includes('ev') || auxiliar.includes('eze'):
            auxiliar = "ev"
            break
        case auxiliar.includes('federico') || auxiliar.includes('fede') || auxiliar.includes('beta'):
            auxiliar = "fb"
            break
    }
    return auxiliar
}
const expediente = (expediente) => {
    return expediente.replace("p-", "").replace("t-", "").replace("sum-", "").replace("p2-", "")
}
fs.createReadStream(__dirname + '/list.csv')
    .pipe(csv({}))
    .on('data', (row) => {
        data.push(row)
    })
    .on('end', () => {
        data.forEach(item => {
            for (const key in item) {
                item[key] = item[key].toLowerCase()
            }
            item.condition = estados(item.condition)
            item.technical = auxiliares(item.technical)
            item.office = normalizar(item.office)
            item.file_number = expediente(item.file_number)
            if (item.office.includes("robos, hurtos y sustraccion automotores - a")) {
                item.office = "automotores"
            }
            if (item.office.includes('ufi') || item.office.includes('unidad fiscal')) {
                item.office = unidades(item.office)
            } else if (item.office.includes('oficina') || item.office.includes('of') || item.office.includes('ofi')) {
                item.office = oficinas(item.office)
            }
        })
        write()
    })

const write = async() => {
    const csv = new ObjectsToCsv(data)
    await csv.toDisk('./list.csv')
}

async function getData() {
    const tech = await technicians.findAll()
    tech.forEach(asd => {
        console.log(asd.name)
    })

}