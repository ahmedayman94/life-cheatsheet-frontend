import { Link, useRouteMatch } from "react-router-dom";
import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import { Post } from "../../interfaces/post.model";
import "./PostModal.css";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import StyleOptions from "../StyleOptions/StyleOptions";

export interface PostModalProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostModal: React.FunctionComponent<PostModalProps> = ({
  post,
  setPosts,
}) => {
  const formik = useFormik({
    initialValues: {
      postTitle: post.title,
      postEditorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(post.content))
      ),
    },
    onSubmit: (values) => {
      const newPost: Post = {
        id: post.id,
        title: values.postTitle,
        category: post.category,
        content: JSON.stringify(
          convertToRaw(values.postEditorState.getCurrentContent())
        ),
      };
      setPosts((posts) => posts.map((p) => (p.id === post.id ? newPost : p)));
    },
  });

  const onEditorChange = (editorState: EditorState) =>
    formik.setFieldValue("postEditorState", editorState);

  const match = useRouteMatch<{ categoryId: string }>();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className="modal fade show d-block"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title w-100">
                <input
                  id="postTitle"
                  name="postTitle"
                  className="post-title w-100"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.postTitle}
                />
              </h4>
            </div>
            <div className="modal-body">
              <StyleOptions
                postEditorState={formik.values.postEditorState}
                onEditorChange={onEditorChange}
              />
              <Editor
                editorState={formik.values.postEditorState}
                onChange={onEditorChange}
              />
            </div>
            <div className="modal-footer">
              <Link
                className="link"
                to={`/categories/${match.params.categoryId}`}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </Link>
              <button className="btn btn-primary" type="submit">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostModal;
