import axios from "axios";
import { Category } from "../interfaces/category.model";
// import categoriesMock from "../mock-data/categories.json";

const apiBaseUrl = process.env.REACT_APP_API_URL;

class CategoriesService {
    fetchAllCategories(): Promise<Category[]> {
        return axios
            .get<Category[]>(`${apiBaseUrl}/categories`)
            .then((res) => res.data);
        // return Promise.resolve(categoriesMock);
    }

    fetchRandom() {
        return axios.get<any>('/api/v1/healthcheck');
    }
}


export default new CategoriesService();
