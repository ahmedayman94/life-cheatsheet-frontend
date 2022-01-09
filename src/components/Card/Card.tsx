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
		try {
			const content = convertFromRaw(JSON.parse(post.content));
			setEditorState(EditorState.createWithContent(content));
		} catch (exception) {
			alert("failed to parse post " + post.id);
		}
	}, [post]);

	const linkToPost = `/categories/${post.categoryId}/posts/${post.id}`;
	return (
		<div className="card card-default w-100">
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
				<div className="card-button-container mt-auto position-relative">
					<div className="position-absolute blur-fade"></div>
					<button
						onClick={() => history.push(linkToPost)}
						className="btn btn-secondary w-100 position-relative on-top"
					>
						Show
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
