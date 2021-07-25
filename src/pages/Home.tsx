import { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import PostModal from "../components/PostModal/PostModal";
import Sidebar from "../components/Sidebar/Sidebar";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import {
  getCategories as getCategoriesAsync,
  getPostsForCategory as getPostsForCategoryAsync,
} from "../utils/http-clients";

export interface HomeProps
  extends RouteComponentProps<{ categoryId: string; postId: string }> {}

const Home: React.FunctionComponent<HomeProps> = ({ match }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();

  const activeCategoryId =
    match.params.categoryId != null ? +match.params.categoryId : null;
  const activePostId = match.params.postId;

  useEffect(() => {
    console.log("active post id: " + activePostId);
    if (activePostId && posts) {
      setActivePost(posts.find((post) => post.id === +activePostId));
    } else {
      setActivePost(undefined);
    }
  }, [activePostId, posts]);

  useEffect(() => {
    getCategoriesAsync()
      .then((res) => {
        setCategories(
          res.map((category) =>
            category.id === activeCategoryId
              ? { ...category, active: true }
              : category
          )
        );
      })
      .catch((err) => {});

    getPostsForCategoryAsync(1).then((posts) => setPosts(posts));

    return () => {};
  }, [activeCategoryId]);

  return (
    <>
      <Navbar />
      <Sidebar categories={categories} />
      <main className="h-100" style={{ marginTop: "56px" }}>
        <div className="container h-100">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-4 my-4" key={post.id}>
                <Card key={post.id} post={post} />
              </div>
            ))}
          </div>
        </div>
        {activePostId != null && activePost != null && (
          <PostModal post={activePost} setPosts={setPosts} />
        )}
      </main>
    </>
  );
};

export default Home;
