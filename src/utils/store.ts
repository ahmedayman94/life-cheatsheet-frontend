import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";

export const updatePostsState = (setPostsState: React.Dispatch<React.SetStateAction<Post[]>>, newPost: Post) => {
    setPostsState(posts => [...posts,
    posts.find(p => p.id === newPost.id) as Post,
    ]);
}

export const setActiveCategory = (categories?: Category[], activeCategoryId?: number | null) =>
    categories?.map(category => category.id === activeCategoryId ? { ...category, active: true } : { ...category, active: false });