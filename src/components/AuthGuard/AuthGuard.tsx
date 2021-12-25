import React from 'react'
import { Redirect } from 'react-router';
import { UserInfoState } from '../../interfaces/user.model'
import Spinner from '../Spinner/Spinner';

export interface AuthGuardProps {
    children: JSX.Element;
    userInfoState: UserInfoState;
}

const AuthGuard = ({ children, userInfoState }: AuthGuardProps) => {
    if (!userInfoState.loaded) return (<Spinner />);

    if (!userInfoState.userInfo)
        return (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        );

    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard
