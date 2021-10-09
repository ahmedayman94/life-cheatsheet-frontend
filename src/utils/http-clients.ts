import axios from "axios";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
// import categoriesMock from "../mock-data/categories.json";
import postsMock from "../mock-data/posts.json";

const apiBaseUrl = process.env.REACT_APP_API_URL;

export function fetchCategories(): Promise<Category[]> {
  return axios
    .get<Category[]>(`${apiBaseUrl}/categories`)
    .then((res) => res.data);
  // return Promise.resolve(categoriesMock);
}

export function fetchPostsForCategory(categoryId: number): Promise<Post[]> {
  return axios
    .get<Post[]>(`${apiBaseUrl}/posts`)
    .then((res) => res.data)
    .then((posts) => posts.filter((post) => post.category === categoryId));
}

export async function createNewPost(post: Post): Promise<Post> {
  const newPost = await axios.post(`${apiBaseUrl}/posts`, post);

  return { ...post, id: newPost.data.id };
}

export async function editPost(post: Post): Promise<void> {
  await axios.put(`${apiBaseUrl}/posts/${post.id}`, post);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
