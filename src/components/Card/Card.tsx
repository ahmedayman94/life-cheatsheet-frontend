import { Link } from "react-router-dom";
import { Post } from "../../interfaces/post.model";

import "./Card.css";
export interface CardProps {
  // title: string;
  // content: string;
  // id?: number;
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const linkToPost = `/categories/${post.category}/posts/${post.id}`;
  return (
    <div className="card card-default">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        {post.id != null && <Link to={linkToPost}>Link to post</Link>}
      </div>
    </div>
  );
};

export default Card;
