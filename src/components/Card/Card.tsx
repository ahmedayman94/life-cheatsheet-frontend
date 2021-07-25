import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../interfaces/post.model";

import "./Card.css";
export interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    const content = convertFromRaw(JSON.parse(post.content));
    setEditorState(EditorState.createWithContent(content));
    return () => {};
  }, [post]);

  const linkToPost = `/categories/${post.category}/posts/${post.id}`;
  return (
    <div className="card card-default">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <span className="card-text">
          {editorState != null && (
            <Editor
              readOnly
              editorState={editorState}
              onChange={setEditorState}
            />
          )}
        </span>
        {post.id != null && (
          <div>
            <Link className="link d-flex flex-column" to={linkToPost}>
              <button className="btn btn-secondary">Link to post</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
