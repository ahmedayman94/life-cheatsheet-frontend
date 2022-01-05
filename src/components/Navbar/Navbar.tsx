import { Justify, List } from "react-bootstrap-icons";
import { UserInfoState } from "../../interfaces/user.model";
import NavbarActions from "../NavbarActions/NavbarActions";

import "./Navbar.css";

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
			<button className="navbar-toggler pl-0" type="button">
				<List />
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
