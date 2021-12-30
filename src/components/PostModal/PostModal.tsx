import { useHistory, useRouteMatch } from "react-router-dom";
import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import { Post } from "../../interfaces/post.model";
import "./PostModal.css";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import StyleOptions from "../StyleOptions/StyleOptions";
import { useEffect, useState } from "react";
import postService from "../../services/post.service";

export interface PostModalProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostModal: React.FunctionComponent<PostModalProps> = ({
  post,
  setPosts,
}) => {
  const history = useHistory();
  const [isEditMode, setIsEditMode] = useState(false);
  const formik = useFormik({
    initialValues: {
      postTitle: post.title,
      postEditorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(post.content))
      ),
    },
    onSubmit: async (values) => {
      const newPost: Post = {
        id: post.id,
        title: values.postTitle,
        category: post.category,
        content: JSON.stringify(
          convertToRaw(values.postEditorState.getCurrentContent())
        ),
      };
      await postService.editPost(newPost);
      setPosts((posts) => posts.map((p) => (p.id === post.id ? newPost : p)));
      setIsEditMode(false);
    },
  });

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === "Escape")
        history.push(`/categories/${match.params.categoryId}`);
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  const onEditorChange = (editorState: EditorState) =>
    formik.setFieldValue("postEditorState", editorState);

  const match = useRouteMatch<{ categoryId: string }>();

  const resetForm = () => {
    formik.resetForm();
    setIsEditMode(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className="modal fade show d-block"
        id="exampleModal"
        tabIndex={-1}
        data-keyboard={true}
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modalHeader m-2 p-2">
              <h4 className="modal-title w-100">
                <input
                  id="postTitle"
                  name="postTitle"
                  className={`post-title w-100 px-3 py-2 ${isEditMode ? "editMode" : ""
                    }`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.postTitle}
                  readOnly={!isEditMode}
                />
              </h4>
            </div>
            <div className="modalBody mx-1 mb-3 px-1">
              <div
                className={`postContentContainer postEditorContainer mx-2 p-3${isEditMode ? " editMode" : ""
                  }`}
              >
                {isEditMode && (
                  <StyleOptions
                    postEditorState={formik.values.postEditorState}
                    onEditorChange={onEditorChange}
                  />
                )}
                <Editor
                  editorState={formik.values.postEditorState}
                  onChange={onEditorChange}
                  readOnly={!isEditMode}
                />
              </div>
            </div>
            <div className="modalActions mt-auto p-3 d-flex">
              <div>
                {!isEditMode && (
                  <button
                    type="button"
                    className="btn btn-secondary ml-3"
                    onClick={() => setIsEditMode(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
              {isEditMode && (
                <div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                  >
                    Save changes
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary ml-3"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() =>
                    history.push(`/categories/${match.params.categoryId}`)
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostModal;
