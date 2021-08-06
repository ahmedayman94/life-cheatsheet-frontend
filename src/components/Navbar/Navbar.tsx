import { Link, useLocation } from "react-router-dom";
import { ClipboardPlus } from "react-bootstrap-icons";
import "./Navbar.css";

const Navbar = () => {
  const pathName = useLocation()?.pathname;
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <Link className="navbar-brand ml-3" to="/">
        Life Cheatsheet
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {/* <ul className="navbar-nav">
          <li className={`nav-item ${pathName === "/" ? "active" : null}`}>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li
            className={`nav-item ${
              pathName === "/categories" ? "active" : null
            }`}
          >
            <Link className="nav-link" to="/categories">
              Categories
            </Link>
          </li>
        </ul> */}
      </div>
      <div className="ml-auto">
        <Link to="/create-post" className="btn btn-light mx-4">
          <span className="createPostClipboardPlus">
            <ClipboardPlus style={{ fontSize: "1.2rem" }} />
          </span>
          <span className="newPost">New Post</span>
        </Link>
        <button className="btn btn-dark">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
