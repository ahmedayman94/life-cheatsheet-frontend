import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import PostModal from "../../components/PostModal/PostModal";
import Posts from "../../components/Posts/Posts";
import Spinner from "../../components/Spinner/Spinner";
import { Category } from "../../interfaces/category.model";
import { Post } from "../../interfaces/post.model";
import { PostsService } from "../../services/posts.service";

export interface HomeProps
  extends RouteComponentProps<{ categoryId: string; postId: string }> {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  activeCategoryId: number | undefined;
  setActiveCategoryId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Home: React.FunctionComponent<HomeProps> = ({
  match,
  categories,
  activeCategoryId,
  setActiveCategoryId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);

  const activePostId = match.params.postId;

  useEffect(() => {
    async function initAsync() {
      const activeCategoryId =
        match.params.categoryId != null ? +match.params.categoryId : undefined;
      setActiveCategoryId(activeCategoryId);

      if (activeCategoryId) {
        setLoading(true);
        const posts = await PostsService.fetchPostsForCategory(
          activeCategoryId
        );
        setPosts(posts);
      } else setPosts([]);

      setLoading(false);
    }

    initAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, match.params.categoryId]);

  useEffect(() => {
    if (activePostId && posts) {
      setActivePost(posts.find((post) => post.id === +activePostId));
    } else {
      setActivePost(undefined);
    }
  }, [activePostId, posts]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Posts posts={posts} activeCategoryId={activeCategoryId} />
      )}
      {activePostId != null && activePost != null && (
        <PostModal post={activePost} setPosts={setPosts} />
      )}
    </>
  );
};

export default Home;
