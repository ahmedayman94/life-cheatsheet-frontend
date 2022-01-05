import { Link } from "react-router-dom";
import { Category } from "../../interfaces/category.model";
import "./Sidebar.css";

export interface SidebarProps {
	categories: Category[];
	activeCategoryId: number | undefined;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({
	categories,
	activeCategoryId,
}) => {
	return (
		<nav className="side-bar position-fixed pt-2 px-3 pl-4">
			<Link className="navbar-brand brand" to="/">
				<span className="d-none d-sm-block">
					Life Cheatsheet
				</span>
				<span className="d-sm-none">LCC</span>
			</Link>
			<div className="mt-4">
				<div className="my-2 mb-3 category-title">
					Categories
				</div>
				<ul className="nav flex-column">
					{categories.map((category) => (
						<li
							className={`nav-item mb-1${
								category.id === activeCategoryId
									? " active"
									: ""
							}`}
							key={category.id}
						>
							<Link
								className="item-link"
								to={`/categories/${category.id}`}
								key={category.id}
							>
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
