
import AuthService from "./auth.service"
import UserService from "./user.service"

const user = AuthService.getCurrentUser()
const checkUserAndRole = {
    checkUser: async () => {
        if (user) {
            const query = await UserService.getUserBoard()
            if (query.status === 200) {
                return true
            }
            else {
                return false
            }
        }
        return false
    },
    checkAdmin: async () => {
        if (user && user.roles.includes("ROLE_ADMIN")) {
            const query = await UserService.getAdminBoard()
            if (query.status === 200) {
                return true
            }
            else {
                return false
            }
        }
        return false
    }
}

export default checkUserAndRole