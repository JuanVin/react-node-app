const apis = {
    getFiles: async () => {
        let data = await fetch('http://localhost:3000/files')
        data = await data.json()
        return data
    },
    getFileByFileNumber: async (file_number) => {
        console.log(file_number)
        let data = await fetch(`http://localhost:3000/files/${file_number}`)
        data = await data.json()
        return data
    },
    getFileByAdmissionDate: async (date) => {
        let data = await fetch(`http://localhost:3000/files/date/admission/${date}`)
        data = await data.json()
        return data
    },
    getFileByEgressDate: async (date) => {
        let data = await fetch(`http://localhost:3000/files/date/egress/${date}`)
        data = await data.json()
        return data
    },
    getFileByShiftDate: async (date) => {
        date = "2022-1-7"
        let data = await fetch(`http://localhost:3000/files/date/shift/${date}`)
        data = await data.json()
        return data
    },
    getFileDates: async () => {
        let data = await fetch(`http://localhost:3000/files/date/shift`)
        data = await data.json()
        return data
    },
    getCurrentDayFiles: async () => {
        let data = await fetch(`http://localhost:3000/files/date/current_day`)
        data = await data.json()
        return data
    },
    getFormData: async () => {
        let data = await fetch(`http://localhost:3000/files/form/data`)
        data = await data.json()
        return data
    },
    getLastFiles: async (number) => {
        let data = await fetch(`http://localhost:3000/files/last/${number}`)
        data = await data.json()
        return data
    },
    postFormData: async (fetchData) => {
        console.log(fetchData)
        let options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fetchData)
            },
            url = `http://localhost:3000/files/form/new_file`,
            response
      
            response = await fetch(url, options)
            response = await response.json()
            return response
    },
    getFileById: async (file_id) => {
        let data = await fetch(`http://localhost:3000/files/get/${file_id}`)
        data = await data.json()
        return data
    },
    postUpdateData: async (fetchData) => {
      
        let options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fetchData)
            },
            url = `http://localhost:3000/files/form/update`,
            response
      
            response = await fetch(url, options)
            response = await response.json()
            return response
    },
    updateDetail: async (fetchData) => {
      
        let options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fetchData)
            },
            url = `http://localhost:3000/files/details/update`,
            response
      
            response = await fetch(url, options)
            response = await response.json()
            return response

    },
    newDetail: async (fetchData) => {
      
        let options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fetchData)
            },
            url = `http://localhost:3000/files/details/new_detail`,
            response
      
            response = await fetch(url, options)
            response = await response.json()
            return response

    },
}
export default apis