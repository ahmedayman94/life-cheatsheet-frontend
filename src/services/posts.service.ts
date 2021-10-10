import axios from "axios";
import { Post } from "../interfaces/post.model";

const apiBaseUrl = process.env.REACT_APP_API_URL;

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