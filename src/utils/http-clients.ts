// import axios from "axios";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import categoriesMock from '../mock-data/categories.json';
import postsMock from '../mock-data/posts.json';

// const apiBaseUrl = process.env.REACT_APP_API_URL;

export function getCategories(): Promise<Category[]> {
    return Promise.resolve(categoriesMock);
}

export function getPostsForCategory(categoryId: number): Promise<Post[]> {
    return delay(500).then(() => Promise.resolve(postsMock.filter(p => p.category === categoryId)));
}

export function createNewPostAsync(post: Post): Promise<Post> {
    return Promise.resolve(post);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}