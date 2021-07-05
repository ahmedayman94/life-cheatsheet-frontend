import { Link, useRouteMatch } from "react-router-dom";
import { Post } from "../../interfaces/post.model";
import "./PostModal.css";

export type PostModalProps = Post;

const PostModal = ({ post }: { post: PostModalProps }) => {
  const match = useRouteMatch<{ categoryId: string }>();
  console.log(match);
  return (
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{post.content}</div>
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
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
