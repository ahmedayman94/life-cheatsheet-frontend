import axios from "axios";
import { Category } from "../interfaces/category.model";
import httpService from "./http.service";
// import categoriesMock from "../mock-data/categories.json";

// const apiBaseUrl = process.env.REACT_APP_API_URL;

class CategoryService {
    fetchAllCategories(): Promise<Category[]> {
        return axios
            .get<Category[]>('/api/v1/categories')
            // .get<Category[]>(`${apiBaseUrl}/categories`)
            .then((res) => res.data);
    }

    createNewCategory(categoryTitle: string): Promise<Category> {
        return httpService.axios
            .post<Category>('/api/v1/categories', { title: categoryTitle })
            .then(res => res.data);
    }

    deleteCategory(categoryId: number): Promise<void> {
        return httpService.axios
            .delete<void>(`/api/v1/categories/${categoryId}`)
            .then(res => res.data);
    }
}


export default new CategoryService();
