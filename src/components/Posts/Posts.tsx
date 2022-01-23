import React from "react";
import { Post } from "../../interfaces/post.model";
import Card from "../Card/Card";

export interface PostsProps {
	posts: Post[];
	activeCategoryId: number | undefined;
}

const Posts: React.FunctionComponent<PostsProps> = ({
	posts,
	activeCategoryId,
}) => {
	return (
		<div className="row">
			{posts.length === 0 ? (
				<div className="col-12 mx-4">
					{activeCategoryId != null ? (
						<h5>No posts for this category...</h5>
					) : (
						<h5>Welcome home</h5>
					)}
				</div>
			) : (
				posts.map((post) => (
					<div
						className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-4"
						key={post.id}
					>
						<Card key={post.id} post={post} />
					</div>
				))
			)}
		</div>
	);
};

export default Posts;
