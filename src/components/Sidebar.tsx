import { Link, useLocation } from 'react-router-dom';
import { Category } from '../interfaces/category.model';
import './Sidebar.css';

const Sidebar = ({ categories }: { categories: Category[] }) => {
    const pathName = useLocation().pathname;
    let categoryId: number;
    const activeCategory = pathName.match(/(?<=categories\/)(.*$)/g);
    if (activeCategory && activeCategory.length > 0) {
        categoryId = +activeCategory[0];
    }
    return (
        <nav className="side-bar position-fixed bg-dark">
            <div className="mt-4 px-3">
                <div className="my-2 category-title">Categories</div>
                <ul className="nav">
                    {categories.map(category => (
                        <li className={`nav-item${category.id === categoryId ? ' active' : ''}`} key={category.id}>
                            <Link className="nav-link" to={`/categories/${category.id}`} key={category.id} >
                                {category.title}
                            </Link>
                        </li>))}
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;
