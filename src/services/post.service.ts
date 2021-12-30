import { Post } from "../interfaces/post.model";
import httpService from "./http.service";

const apiBaseUrl = process.env.REACT_APP_API_URL;

class PostService {
    fetchPostsForCategory(categoryId: number): Promise<Post[]> {
        return httpService.axios
            .get<Post[]>(`${apiBaseUrl}/posts`)
            .then((res) => res.data)
            .then((posts) => posts.filter((post) => post.category === categoryId));
    }

    async createNewPost(post: Post): Promise<Post> {
        const newPost = await httpService.axios.post(`${apiBaseUrl}/posts`, post);

        return { ...post, id: newPost.data.id };
    }

    async editPost(post: Post): Promise<void> {
        await httpService.axios.put(`${apiBaseUrl}/posts/${post.id}`, post);
    }
}

export default new PostService();