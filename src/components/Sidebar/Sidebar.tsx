import { Link } from "react-router-dom";
import { Category } from "../../interfaces/category.model";
import "./Sidebar.css";

export interface SidebarProps {
	categories: Category[];
	activeCategoryId: number | undefined;
}

const Sidebar = ({ categories, activeCategoryId }: SidebarProps) => {
	return (
		<nav className="side-bar position-fixed">
			<div className="mt-4 px-3">
				<div className="my-2 category-title h5">Categories</div>
				<ul className="nav flex-column">
					{categories.map((category) => (
						<li
							className={`my-2 nav-item${category.id === activeCategoryId ? " active" : ""}`}
							key={category.id}
						>
							<Link className="item-link" to={`/categories/${category.id}`} key={category.id}>
								{category.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;
