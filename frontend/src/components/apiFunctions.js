const apis = {
    getFiles: async() => {
        let data = await fetch('http://localhost:3000/files')
        data = await data.json()
        return data
    },
    getFileByFileNumber: async(file_number) => {
        let data = await fetch(`http://localhost:3000/files/21817-17`)
        data = await data.json()
        return data
    },
    getFileByAdmissionDate: async(date) => {
        let data = await fetch(`http://localhost:3000/files/date/admission/${date}`)
        data = await data.json()
        return data
    },
    getFileByEgressDate: async(date) => {
        let data = await fetch(`http://localhost:3000/files/date/egress/${date}`)
        data = await data.json()
        return data
    },
    getFileByShiftDate: async(date) => {
        date = "2022-1-7"
        let data = await fetch(`http://localhost:3000/files/date/shift/${date}`)
        data = await data.json()
        return data
    },
    getFileDates: async() => {
        let data = await fetch(`http://localhost:3000/files/date/shift`)
        data = await data.json()
        return data
    },
    getCurrentDayFiles: async() => {
        let data = await fetch(`http://localhost:3000/files/date/current_day`)
        data = await data.json()
        return data
    },
    getFormData: async() => {
        let data = await fetch(`http://localhost:3000/files/form/data`)
        data = await data.json()
        return data
    }
}

export default apis