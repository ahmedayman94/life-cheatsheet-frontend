import axios, { AxiosInstance } from "axios";

export class HttpService {
    public readonly axios: AxiosInstance;

    constructor() {
        this.axios = axios.create();
        axios.interceptors.request.use(config => {
            console.log(new Date().getTime());
            return config;
        });
    }
}

export default new HttpService();
