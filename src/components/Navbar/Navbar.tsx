import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserInfoState } from "../../interfaces/user.model";
import NavbarActions from "../NavbarActions/NavbarActions";

interface NavbarProps {
	userInfoState: UserInfoState;
	loginClicked: () => void;
	logoutClicked: () => void;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
	userInfoState,
	loginClicked,
	logoutClicked,
}) => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top pl-4">
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
			<div className="ml-auto mr-2">
				<NavbarActions
					loginClicked={loginClicked}
					logoutClicked={logoutClicked}
					userInfoState={userInfoState}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
