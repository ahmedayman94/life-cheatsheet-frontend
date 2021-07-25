import { Post } from "../interfaces/post.model";

export const updatePostsState = (setPostsState: React.Dispatch<React.SetStateAction<Post[]>>, newPost: Post) => {
    setPostsState(posts => [...posts,
    posts.find(p => p.id === newPost.id) as Post,
    ]);
}