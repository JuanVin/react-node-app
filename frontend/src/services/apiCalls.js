import ApiService from './api.services';
const URL = 'http://172.17.17.21:3000'
const apis = {
    getFiles: async () => {
        return ApiService.genericGet(`${URL}/files`)
    },
    getFileByFileNumber: async (file_number) => {
        return ApiService.genericGet(`${URL}/api/files/${file_number}`)
    },
    getFileByAdmissionDate: async (date) => {
        return ApiService.genericGet(`${URL}/api/files/date/admission/${date}`)
    },
    getFileByEgressDate: async (date) => {
        return ApiService.genericGet(`${URL}/api/files/date/egress/${date}`)
    },
    getFileByShiftDate: async (date) => {
        return ApiService.genericGet(`${URL}/api/files/date/shift/${date}`)
    },
    getFileDates: async () => {
        return ApiService.genericGet(`${URL}/api/files/date/current_day`)
    },
    getCurrentDayFiles: async () => {
        return ApiService.genericGet(`${URL}/api/files/date/current_day`)
    },
    getFormData: async () => {
        return ApiService.genericGet(`${URL}/api/files/form/data`)
    },
    getLastFiles: async (number) => {
        return ApiService.genericGet(`${URL}/api/files/last/${number}`)
    },
    getTechnicians: async () => {
        return ApiService.genericGet(`${URL}/api/technicians`)
    },
    postFormData: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/form/new_file`)
    },
    getFileById: async (file_id) => {
        return ApiService.genericGet(`${URL}/api/files/get/${file_id}`)
    },
    postUpdateData: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/form/update`)
    },
    updateDetail: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/details/update`)
    },
    newDetail: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/details/new_detail`)
    },
    deteleDetail: async (id) => {
        return ApiService.genericDelete(`${URL}/api/files/details/delete/${id}`)
    },
    getStadisticsByDate: async (fetchData) => {
        return ApiService.genericGet(`${URL}/api/files/stadistics/${JSON.stringify(fetchData)}`)
    },
    getFilesByTechnician: async (params) => {
        return ApiService.genericGet(`${URL}/api/files/technician/${JSON.stringify(params)}`)
        //return ApiService.genericPost(fetchData, `${URL}/api/files/technician`)
    },
    postNewExtraction: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/new_extraction`)
    },
    postExtractionNumber: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/set_extraction_number`)
    },
    getExtractionInfo: async (id) => {
        return ApiService.genericGet(`${URL}/api/files/get_extraction/${id}`)
    },
    getExtractionsById: async (id) => {
        return ApiService.genericGet(`${URL}/api/files/get_extractions_by_id/${id}`)
    },
    updateExtraction: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/update_extraction`)
    },
    updateFormsNumber: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/update_extraction_number`)
    },
    deleteForm: async (fetchData) => {
        let options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetchData)
        },
            url = `${URL}/api/files/delete_extraction_form`,
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    updateDeviceNumbers: async (fetchData) => {
        return ApiService.genericPost(fetchData, `${URL}/api/files/update_device_numbers`)
    },
}
export default apis