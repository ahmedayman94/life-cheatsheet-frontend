import { convertToRaw, Editor, EditorState } from "draft-js";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { createNewPostAsync, getCategories } from "../utils/http-clients";
import { Category } from "../interfaces/category.model";
import { Post } from "../interfaces/post.model";
import * as Yup from "yup";

const CreatePost = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("getCategories");
        setCategories(res);
      })
      .catch((err) => {});
  }, []);

  const onEditorChange = (editorState: EditorState) =>
    formik.setFieldValue("postEditorState", editorState);

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      postCategory: -1,
      postEditorState: EditorState.createEmpty(),
    },
    validationSchema: Yup.object().shape({
      postTitle: Yup.string().min(3).required("Required"),
      postCategory: Yup.number().min(0),
      postEditorState: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      let newPost: Post = {
        title: values.postTitle,
        category: values.postCategory,
        content: JSON.stringify(
          convertToRaw(values.postEditorState.getCurrentContent())
        ),
      };

      newPost = await createNewPostAsync(newPost);
      // setPosts((posts) => [...posts, newPost]);
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
        <div className="container h-100 pb-5">
          <form
            className="h-100 d-flex flex-column pb-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="row flex-grow-0">
              <div className="col-12 mt-5">
                <h5 className="w-100">
                  <input
                    id="postTitle"
                    name="postTitle"
                    placeholder="Add title"
                    className="post-title w-100 p-2"
                    // style={{ border: "1px solid grey" }}
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.postTitle}
                  />
                </h5>
              </div>
            </div>
            <div className="row flex-grow-0">
              <div className="col-12">
                <select
                  className="form-control"
                  name="postCategory"
                  id="postCategory"
                  onChange={formik.handleChange}
                  value={formik.values.postCategory}
                >
                  <option disabled value={-1}>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row flex-grow-1">
              <div className="col-12 p-4">
                <Editor
                  placeholder="Add post content"
                  editorState={formik.values.postEditorState}
                  onChange={(editorState) => {
                    onEditorChange(editorState);
                  }}
                />
              </div>
            </div>

            <div className="row flex-grow-0">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formik.dirty || !formik.isValid}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreatePost;
