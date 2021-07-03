import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  getCategories,
  getPostsForCategory,
} from "../http-clients/http-clients";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import { getCategoryIdFromPath } from "../utils/utils";

const Home: React.FunctionComponent = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryId = getCategoryIdFromPath(useLocation().pathname);
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {});
    //   if (categoryId != null)
    getPostsForCategory(1).then((posts) => setPosts(posts));

    return () => {};
  }, []);
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <>
      <Navbar />
      <Sidebar categories={categories} />
      <main style={{ marginTop: "56px" }}>
        <div className="container">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-4 my-4" key={post.id}>
                <Card key={post.id} title={post.title} content={post.content} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
