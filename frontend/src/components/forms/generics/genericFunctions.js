
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const genericFunctions = {
    loadTechnician: (technicians) => {
        let techData = [];
        techData.push(<option value={0}>No asignado</option>);
        technicians.forEach((technician) => {
            techData.push(
                <option value={technician.id}>{technician.name.toUpperCase()}</option>
            );
        });
        return techData;
    },
    loadCondition: (condition) => {
        let fileCondition = [];
        condition.forEach((singleCondition) => {
            fileCondition.push(
                <option value={singleCondition.id}>
                    {capitalizeFirstLetter(singleCondition.condition)}
                </option>
            );
        });
        return fileCondition;
    },
    loadOffices: (offices) => {
        let fiscalData = [];
        fiscalData.push(<option value={0}>{"Sin asignar"}</option>);
        offices.sort();
        offices.forEach((office) => {
            fiscalData.push(
                <option value={office.id}>
                    {capitalizeFirstLetter(office.name)}
                </option>
            )
        })
        return fiscalData
    },
    loadTypes: (types) => {
        let fileType = [];
        types.forEach((type) => {
            fileType.push(
                <option value={type.id}>{type.type.toUpperCase() + "-"}</option>
            );
        });
        fileType.push(<option value={0}>{"Sin asignar"}</option>);
        return fileType;
    },
    setDataValues: (param, option) => {
        if (param !== null) {
            let date = new Date(param);
            if (option === 1) {
                date.setHours(date.getHours() - 3);
                return date.toISOString().substr(0, 16);
            }
            return date.toISOString().substr(0, 10);
        }
        return param;
    }
}

export default genericFunctions
