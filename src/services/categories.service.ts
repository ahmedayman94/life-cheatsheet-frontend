import axios from "axios";
import { Category } from "../interfaces/category.model";
// import categoriesMock from "../mock-data/categories.json";

const apiBaseUrl = process.env.REACT_APP_API_URL;

function fetchAllCategories(): Promise<Category[]> {
    return axios
        .get<Category[]>(`${apiBaseUrl}/categories`)
        .then((res) => res.data);
    // return Promise.resolve(categoriesMock);
}

export const CategoriesService = {
    fetchAllCategories,
};
