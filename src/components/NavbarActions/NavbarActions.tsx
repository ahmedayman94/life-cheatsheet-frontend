/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretDownFill, Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { UserInfoState } from '../../interfaces/user.model';
import './NavbarActions.css';

export interface NavbarActionsProps {
    loginClicked: () => void;
    logoutClicked: () => void;
    userInfoState: UserInfoState;
}

const NavbarActions: React.FunctionComponent<NavbarActionsProps> =
    ({ loginClicked, logoutClicked, userInfoState }) => {
        const [showProfileDropdown, setShowProfileDropdown] = useState('')
        const [showNewContentDropdown, setShowNewContentDropdown] = useState('')
        const ref = useRef(null);
        const refNewContent = useRef(null);

        const onProfileClicked = useCallback(
            () => {
                setShowProfileDropdown(showProfileDropdown => showProfileDropdown === '' ? 'show' : '');
            },
            [],
        );

        const onNewContentClicked = useCallback(
            () => {
                setShowNewContentDropdown(showNewContentDropdown => showNewContentDropdown === '' ? 'show' : '');
            },
            [],
        );

        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !(ref.current as any).contains(event.target))
                    setShowProfileDropdown('');
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !(refNewContent.current as any).contains(event.target))
                    setShowNewContentDropdown('');
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [refNewContent]);

        return (
            <>
                {userInfoState.loaded &&
                    (!userInfoState.userInfo ? (
                        <button className="btn btn-secondary" onClick={loginClicked}>
                            Login
                        </button>
                    ) :
                        (
                            <span>
                                <span className="dropdown-container new-content-container mr-3" ref={refNewContent}>
                                    <a onClick={onNewContentClicked}>
                                        <Plus size="2rem" />
                                        <CaretDownFill size="0.7rem" />
                                    </a>
                                    <div className={"dropdown-menu " + showNewContentDropdown} onClick={onNewContentClicked}>
                                        <Link className="dropdown-item" to="/create-post">
                                            New Post
                                        </Link>
                                        <a className="dropdown-item" onClick={logoutClicked}>
                                            New Category
                                        </a>
                                    </div>
                                </span>
                                <span className="dropdown-container profile-dropdown-container" ref={ref}>
                                    <a onClick={onProfileClicked}>
                                        <img className="profile-picture" src={userInfoState.userInfo.picture} alt="profile" />
                                    </a>
                                    <div className={"dropdown-menu " + showProfileDropdown}>
                                        <Link className="dropdown-item pb-4" to="/profile" onClick={onProfileClicked}>
                                            My profile
                                        </Link>
                                        <a className="dropdown-item" onClick={logoutClicked}>
                                            Logout
                                        </a>
                                    </div>
                                </span>
                            </span>
                        )
                    )
                }
            </>
        )
    }

export default NavbarActions
