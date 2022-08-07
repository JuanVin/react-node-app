import secureStorage from "./hash.service"
const URL = 'http://localhost:3000'
const AuthService = {
    login: async (username, password) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        },
            url = `${URL}/api/auth/signin`,
            status,
            response

        const query = await fetch(url, options)
        status = query.status
        response = await query.json()
        if (response.accessToken) {
            secureStorage.setItem("user", response)
            //localStorage.setItem("user", JSON.stringify(response));
        }
        return response
    },
    logout: () => {
        //localStorage.removeItem("user");
        secureStorage.removeItem('user');
    },
    register: async (username, password) => {
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        },
            url = `${URL}/api/auth/signup`

        const query = await fetch(url, options)
    },
    getCurrentUser: () => {
        return secureStorage.getItem('user');
        //return JSON.parse(localStorage.getItem('user'));
    }
}

export default AuthService