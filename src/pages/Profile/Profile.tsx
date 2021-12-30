import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import { UserInfoState } from "../../interfaces/user.model";

export interface ProfileProps {
    userInfoState: UserInfoState;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ userInfoState }) => {
    if (!userInfoState.loaded) return <Spinner />;
    return (
        <>
            <div className="row">
                <div className="col">
                    <h2>My Profile page</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">Email: </div>
                <div className="col">{userInfoState.userInfo?.email}</div>
            </div>
            <div className="row">
                <div className="col-auto">First name: </div>
                <div className="col">{userInfoState.userInfo?.firstName}</div>
            </div>
            <div className="row">
                <div className="col-auto">Last name: </div>
                <div className="col">{userInfoState.userInfo?.lastName}</div>
            </div>
        </>
    );
};

export default Profile;
