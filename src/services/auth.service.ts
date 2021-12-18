import axios from "axios";

class AuthService {

    async login(idToken: string) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const params = new URLSearchParams()
        params.append('idToken', idToken);
        try {
            const res = await axios.post("/api/v1/auth/login/google", params, config);
            debugger;
        } catch (exception: any) {
            debugger;
        }
    }
}


export default new AuthService();