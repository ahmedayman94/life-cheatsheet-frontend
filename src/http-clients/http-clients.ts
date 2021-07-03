import axios from "axios";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import categoriesMock from '../mock-data/categories.json';
import postsMock from '../mock-data/posts.json';

const apiBaseUrl = process.env.REACT_APP_API_URL;

export function getCategories(): Promise<Category[]> {
    return Promise.resolve(categoriesMock);
}

export function getPostsForCategory(categoryId: number): Promise<Post[]> {
    return Promise.resolve(postsMock);
}