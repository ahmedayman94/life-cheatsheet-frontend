import React from "react";
import { Post } from "../../interfaces/post.model";
import Card from "../Card/Card";

export interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="row">
      {posts.map((post) => (
        <div className="col-md-4 my-4" key={post.id}>
          <Card key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
