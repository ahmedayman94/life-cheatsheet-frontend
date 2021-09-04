import axios from "axios";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
// import categoriesMock from "../mock-data/categories.json";
import postsMock from "../mock-data/posts.json";

const apiBaseUrl = process.env.REACT_APP_API_URL;

export function fetchCategoriesAsync(): Promise<Category[]> {
  return axios
    .get<Category[]>(`${apiBaseUrl}/categories`)
    .then((res) => res.data);
  // return Promise.resolve(categoriesMock);
}

export function getPostsForCategory(categoryId: number): Promise<Post[]> {
  return axios
    .get<Post[]>(`${apiBaseUrl}/posts`)
    .then((res) => res.data)
    .then((posts) => posts.filter((post) => post.category === categoryId));

  return delay(500).then(() =>
    Promise.resolve(postsMock.filter((p) => p.category === categoryId))
  );
}

export async function createNewPostAsync(post: Post): Promise<Post> {
  const newPost = await axios.post(`${apiBaseUrl}/posts`, post);
  return Promise.resolve({ ...post, id: newPost.data.id });
}

export async function editPostAsync(post: Post): Promise<void> {
  await axios.put(`${apiBaseUrl}/posts/${post.id}`, post);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
