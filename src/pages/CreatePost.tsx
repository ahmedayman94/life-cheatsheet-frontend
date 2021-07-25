import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { createNewPostAsync, getCategories } from "../utils/http-clients";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";

const CreatePost = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const formik = useFormik({
    initialValues: {
      postTitle: "Add title",
      postCategory: 0,
      postEditorState: EditorState.createEmpty(),
    },
    onSubmit: async (values) => {
      let newPost: Post = {
        title: values.postTitle,
        category: values.postCategory,
        content: JSON.stringify(
          convertToRaw(values.postEditorState.getCurrentContent())
        ),
      };

      newPost = await createNewPostAsync(newPost);
      setPosts((posts) => [...posts, newPost]);
    },
  });

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
      <main className="h-100" style={{ marginTop: "56px" }}>
        <div className="container h-100"></div>
      </main>
    </>
  );
};

export default CreatePost;
function setPosts(arg0: (posts: any) => any) {
  throw new Error("Function not implemented.");
}
