import { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PostModal from "../components/PostModal/PostModal";
import Posts from "../components/Posts/Posts";
import Sidebar from "../components/Sidebar/Sidebar";
import Spinner from "../components/Spinner/Spinner";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import {
  getCategories as getCategoriesAsync,
  getPostsForCategory as getPostsForCategoryAsync,
} from "../utils/http-clients";
import { setActiveCategory } from "../utils/store";

export interface HomeProps
  extends RouteComponentProps<{ categoryId: string; postId: string }> {}

const Home: React.FunctionComponent<HomeProps> = ({ match }) => {
  const [categories, setCategories] = useState<Category[]>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);

  const activeCategoryId =
    match.params.categoryId != null ? +match.params.categoryId : null;
  const activePostId = match.params.postId;

  useEffect(() => {
    if (activePostId && posts) {
      setActivePost(posts.find((post) => post.id === +activePostId));
    } else {
      setActivePost(undefined);
    }
  }, [activePostId, posts]);

  useEffect(() => {
    getCategoriesAsync()
      .then((res) => {
        console.log("getCategories");
        setCategories(setActiveCategory(res, activeCategoryId));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    async function initAsync() {
      setCategories((categories) =>
        setActiveCategory(categories, activeCategoryId)
      );
      if (activeCategoryId != null) {
        console.log("getPostsForCateogory");
        setLoading(true);
        try {
          const posts = await getPostsForCategoryAsync(activeCategoryId);
          setPosts(posts);
        } catch (error) {}
      }
      setLoading(false);
    }

    initAsync();
    return () => {};
  }, [activeCategoryId]);

  return (
    <>
      <Navbar />
      <Sidebar categories={categories ?? []} />
      <main className="h-100" style={{ marginTop: "56px" }}>
        <div className="container h-100">
          {loading ? <Spinner /> : <Posts posts={posts} />}
        </div>
        {activePostId != null && activePost != null && (
          <PostModal post={activePost} setPosts={setPosts} />
        )}
      </main>
    </>
  );
};

export default Home;
