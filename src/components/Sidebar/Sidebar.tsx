import { Link } from "react-router-dom";
import { Category } from "../../interfaces/category.model";
import "./Sidebar.css";

const Sidebar = ({ categories }: { categories: Category[] }) => {
  return (
    <nav className="side-bar position-fixed bg-dark">
      <div className="mt-4 px-3">
        <div className="my-2 category-title">Categories</div>
        <ul className="nav">
          {categories.map((category) => (
            <li
              className={`my-2 nav-item${category.active ? " active" : ""}`}
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
