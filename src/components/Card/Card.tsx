import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Post } from "../../interfaces/post.model";

import "./Card.css";
export interface CardProps {
  post: Post;
}

const Card: React.FunctionComponent<CardProps> = ({ post }) => {
  const history = useHistory();
  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    const content = convertFromRaw(JSON.parse(post.content));
    setEditorState(EditorState.createWithContent(content));
    return () => {};
  }, [post]);

  const linkToPost = `/categories/${post.category}/posts/${post.id}`;
  return (
    <div className="card card-default">
      <div className="card-body d-flex flex-column">
        <div className="card-title">
          <h5>{post.title}</h5>
        </div>
        <div className="card-text">
          {editorState != null && (
            <Editor
              readOnly
              editorState={editorState}
              onChange={setEditorState}
            />
          )}
        </div>
        <div className="mt-auto">
          <button
            onClick={() => history.push(linkToPost)}
            className="btn btn-secondary w-100"
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
