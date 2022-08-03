
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/test/';

const UserService = {
    getPublicContent: async () => {
        return await fetch(`${API_URL}all`)
    },
    getUserBoard: async () => {
        const query = await fetch(`${API_URL}user`, { headers: authHeader() })
        const response = await query.json()
        const status = query.status
        return {response, status}
    },
    getAdminBoard: async () => {
        const query = await fetch(`${API_URL}admin`, { headers: authHeader() })
        const response = await query.json()
        const status = query.status
        return {response, status}
    },
}

export default UserService;