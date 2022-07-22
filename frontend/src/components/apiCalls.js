const apis = {
    getFiles: async () => {
        let data = await fetch('http://localhost:3000/files')
        data = await data.json()
        return data
    },
    getFileByFileNumber: async (file_number) => {
        let data = await fetch(`http://localhost:3000/api/files/${file_number}`),
            status = data.status

        data = await data.json()
        return { data, status }
    },
    getFileByAdmissionDate: async (date) => {
        let data = await fetch(`http://localhost:3000/api/files/date/admission/${date}`)
        data = await data.json()
        return data
    },
    getFileByEgressDate: async (date) => {
        let data = await fetch(`http://localhost:3000/api/files/date/egress/${date}`)
        data = await data.json()
        return data
    },
    getFileByShiftDate: async (date) => {
        let data = await fetch(`http://localhost:3000/api/files/date/shift/${date}`)
        data = await data.json()
        return data
    },
    getFileDates: async () => {
        let data = await fetch(`http://localhost:3000/api/files/date/shift`)
        data = await data.json()
        return data
    },
    getCurrentDayFiles: async () => {
        let data = await fetch(`http://localhost:3000/api/files/date/current_day`)
        data = await data.json()
        return data
    },
    getFormData: async () => {
        let data = await fetch(`http://localhost:3000/api/files/form/data`)
        data = await data.json()
        return data
    },
    getLastFiles: async (number) => {
        let data = await fetch(`http://localhost:3000/api/files/last/${number}`)
        data = await data.json()
        return data
    },
    getTechnicians: async () => {
        let data = await fetch(`http://localhost:3000/api/technicians`)
        data = await data.json()
        return data
    },
    postFormData: async (fetchData) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/form/new_file`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    getFileById: async (file_id) => {
        let data = await fetch(`http://localhost:3000/api/files/get/${file_id}`)
        data = await data.json()
        return data
    },
    postUpdateData: async (fetchData) => {

        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/form/update`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }


    },
    updateDetail: async (fetchData) => {

        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/details/update`,
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
            url = `http://localhost:3000/api/files/details/new_detail`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response: response, status: status }

    },
    deteleDetail: async (id) => {

        let options = {
            method: 'delete',
        },
            url = `http://localhost:3000/api/files/details/delete/${id}`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response: response, status: status }

    },
    getStadisticsByDate: async (fetchData) => {

        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/stadistics/all`,
            response

        response = await fetch(url, options)
        response = await response.json()
        return response
    },
    getFilesByTechnician: async (fetchData) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/technician`,
            response

        response = await fetch(url, options)
        response = await response.json()
        return response
    },
    postNewExtraction: async (fetchData) => {

        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/new_extraction`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    postExtractionNumber: async (fetchData) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/set_extraction_number`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    getExtractionInfo: async (id) => {
        let response = await fetch(`http://localhost:3000/api/files/get_extraction/${id}`)
        let status = response.status
        response = await response.json()
        return { response, status }
    },
    getExtractionsById: async (id) => {
        let response = await fetch(`http://localhost:3000/api/files/get_extractions_by_id/${id}`)
        let status = response.status
        response = await response.json()
        return { response, status }
    },
    updateExtraction: async (fetchData) => {

        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/update_extraction`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    updateFormsNumber: async (fetchData) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/update_extraction_number`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    deleteForm: async (fetchData) => {

        let options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/delete_extraction_form`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    updateDeviceNumbers: async (fetchData) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `http://localhost:3000/api/files/update_device_numbers`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
}
export default apis