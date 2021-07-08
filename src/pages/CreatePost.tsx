import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { getCategories } from "../http-clients/http-clients";
import { Category } from "../interfaces/category.model";

const CreatePost = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {});
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar categories={categories} />
      <main style={{ marginTop: "56px" }}>
        <div className="container"></div>
      </main>
    </>
  );
};

export default CreatePost;
