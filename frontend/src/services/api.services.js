import authHeader from './auth-header';
const ApiService = {
    genericGet: async (url) => {
        let options = {
            method: 'get',
            headers: authHeader(),
        },
        response,
        status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return {response, status}
    },
    genericPost: async (body, url) => {
        const header = authHeader()
        header['Content-Type'] = 'application/json'

        let options = {
            method: 'post',
            headers: header,
            body: JSON.stringify(body)
        },
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    },
    genericDelete: async (url) => {
        let options = {
            method: 'delete',
        },
            response,
            status

        response = await fetch(url, options)
        status = response.status
        response = await response.json()
        return { response, status }
    }
}

export default ApiService