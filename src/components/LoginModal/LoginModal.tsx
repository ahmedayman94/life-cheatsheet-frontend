import React, { useState } from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { UserInfoState } from '../../interfaces/user.model';
import authService from '../../services/auth.service';
import Spinner from '../Spinner/Spinner';

import './LoginModal.css';

export interface LoginModalProps {
    showLoginModal: boolean;
    onCloseModalClicked: () => void;
    setUserInfoState: React.Dispatch<React.SetStateAction<UserInfoState>>;
}

const LoginModal: React.FunctionComponent<LoginModalProps> =
    ({ showLoginModal, onCloseModalClicked, setUserInfoState }) => {

        const [loading, setLoading] = useState(false)

        const responseGoogle = (
            response: GoogleLoginResponse | GoogleLoginResponseOffline
        ) => {
            authService.login((response as GoogleLoginResponse).tokenId)
                .then(res => {
                    setLoading(false)
                    setUserInfoState({ loaded: true, userInfo: res });
                    onCloseModalClicked();
                })
                .catch(err => {
                    console.error(err);
                    alert("Failed to login");
                });
        };

        return (
            <div className={`modal-overlay${showLoginModal ? ' modal-show' : ''}`}>
                <div className="modal-content d-flex px-5 py-3 pt-5">
                    <div className="text-center">
                        <h5>
                            {loading ? (<Spinner />) :
                                ('To signin/signup, click on the Login button below')
                            }
                        </h5>
                    </div>
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col">
                                <GoogleLogin
                                    clientId="637229961998-g5bvh8jj55q2ubgvuh7ej17k8no2vnus.apps.googleusercontent.com"
                                    buttonText="Login"
                                    theme="dark"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    onRequest={() => setLoading(true)}
                                    isSignedIn={false}
                                    fetchBasicProfile={true}
                                    disabled={loading}
                                />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-danger d-block h-100" onClick={onCloseModalClicked}
                                    disabled={loading}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default LoginModal