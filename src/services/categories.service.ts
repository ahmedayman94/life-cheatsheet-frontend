import axios from "axios";
import { Category } from "../interfaces/category.model";
// import categoriesMock from "../mock-data/categories.json";

const apiBaseUrl = process.env.REACT_APP_API_URL;

export function fetchCategories(): Promise<Category[]> {
    return axios
        .get<Category[]>(`${apiBaseUrl}/categories`)
        .then((res) => res.data);
    // return Promise.resolve(categoriesMock);
}
