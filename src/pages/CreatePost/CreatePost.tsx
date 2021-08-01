import { convertToRaw, Editor, EditorState } from "draft-js";
import { useFormik } from "formik";
import { useEffect } from "react";
import { createNewPostAsync, getCategories } from "../../utils/http-clients";
import { Category } from "../../interfaces/category.model";
import { Post } from "../../interfaces/post.model";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";
import StyleOptions from "../../components/StyleOptions/StyleOptions";
import "./CreatePost.css";

export interface CreatePostProps {
  categories: Category[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setActiveCategoryId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CreatePost: React.FunctionComponent<CreatePostProps> = ({
  categories,
  setCategories,
  setActiveCategoryId,
}) => {
  const history = useHistory();

  useEffect(() => {
    setActiveCategoryId(undefined);

    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      postEditorState: Yup.object().test("has text", (value: any) =>
        value?.getCurrentContent().hasText()
      ),
    }),
    onSubmit: async (values) => {
      let newPost: Post = {
        title: values.postTitle,
        category: +values.postCategory,
        content: JSON.stringify(
          convertToRaw(values.postEditorState.getCurrentContent())
        ),
      };

      newPost = await createNewPostAsync(newPost);

      history.push(`/categories/${newPost.category}/posts/${newPost.id}`);
    },
  });

  return (
    <>
      <form
        className="h-100 d-flex flex-column pb-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="row flex-grow-0">
          <div id="newPostTitle" className="col-12 mt-5">
            <h3 className="w-100 mb-0">
              <input
                id="postTitle"
                name="postTitle"
                placeholder="Add title"
                className="post-title w-100 px-3 py-2"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.postTitle}
              />
            </h3>
          </div>
        </div>
        <div id="newPostCategory" className="row flex-grow-0 mt-3">
          <div className="col-12">
            <select
              className="form-control"
              name="postCategory"
              id="postCategorySelect"
              onChange={formik.handleChange}
              value={formik.values.postCategory}
            >
              <option disabled value={-1}>
                Select a category
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="newPostContent" className="row no-gutters flex-grow-1 mt-3">
          <div id="newPostContentContainer" className="col-12 p-3">
            <StyleOptions
              postEditorState={formik.values.postEditorState}
              onEditorChange={onEditorChange}
            />
            <Editor
              placeholder="Add post content"
              editorState={formik.values.postEditorState}
              onChange={onEditorChange}
            />
          </div>
        </div>

        <div className="row flex-grow-0 mt-4">
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
    </>
  );
};

export default CreatePost;
