import { UserInfo } from "../interfaces/user.model";
import httpService from "./http.service";

class AuthService {
    login(idToken: string): Promise<UserInfo> {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const params = new URLSearchParams()
        params.append('idToken', idToken);

        return httpService.axios.post("/api/v1/auth/login/google", params, config).then(res => res.data);
    }

    logout() {
        return httpService.axios.post("/api/v1/auth/logout").then(res => res.data);
    }

    getMyInfo(): Promise<UserInfo | null> {
        return httpService.axios.get('/api/v1/users/me')
            .then(res => res.data)
            .catch(err => {
                if (err.response.status === 401) return null;

                throw err;
            });
    }
}

export default new AuthService();