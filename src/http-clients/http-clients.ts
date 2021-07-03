import axios from "axios";
import { Category } from "../interfaces/category.model";
import data from '../mock-data/categories.json';

const apiBaseUrl = process.env.REACT_APP_API_URL;

export function getCategories(): Promise<Category[]> {
    return Promise.resolve(data);
}