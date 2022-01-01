import { Post } from "../interfaces/post.model";
import httpService from "./http.service";

const apiBaseUrl = process.env.REACT_APP_API_URL;

class PostService {
    private readonly baseUrl = "/api/v1/categories"

    fetchPostsForCategory(categoryId: number): Promise<Post[]> {
        return httpService.axios
            // .get<Post[]>(`${apiBaseUrl}/posts`)
            .get<Post[]>(`${this.baseUrl}/${categoryId}/posts`)
            .then((res) => res.data)
            .then((posts) => posts.filter((post) => post.categoryId === categoryId));
    }

    createNewPost(post: Post): Promise<Post> {
        const newPost = { title: post.title, content: post.content };

        return httpService.axios
            .post<Post>(`${this.baseUrl}/${post.categoryId}/posts`, newPost)
            .then((res) => res.data);
    }

    // async createNewPost(post: Post): Promise<Post> {
    //     const newPost = await httpService.axios.post(`${apiBaseUrl}/posts`, post);

    //     return { ...post, id: newPost.data.id };
    // }

    async editPost(post: Post): Promise<void> {
        await httpService.axios.put(`${apiBaseUrl}/posts/${post.id}`, post);
    }
}

export default new PostService();