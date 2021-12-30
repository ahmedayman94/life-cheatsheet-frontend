import axios from "axios";
import { Post } from "../interfaces/post.model";

const apiBaseUrl = process.env.REACT_APP_API_URL;

function fetchPostsForCategory(categoryId: number): Promise<Post[]> {
    return axios
        .get<Post[]>(`${apiBaseUrl}/posts`)
        .then((res) => res.data)
        .then((posts) => posts.filter((post) => post.category === categoryId));
}

async function createNewPost(post: Post): Promise<Post> {
    const newPost = await axios.post(`${apiBaseUrl}/posts`, post);

    return { ...post, id: newPost.data.id };
}

async function editPost(post: Post): Promise<void> {
    await axios.put(`${apiBaseUrl}/posts/${post.id}`, post);
}

export const PostService = {
    fetchPostsForCategory,
    createNewPost,
    editPost,
};