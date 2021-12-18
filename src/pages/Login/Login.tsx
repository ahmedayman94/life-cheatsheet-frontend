import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import authService from "../../services/auth.service";

const responseGoogle = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  await authService.login((response as GoogleLoginResponse).tokenId);
};

const Login = () => {
  return (
    <div className="container vh-100 vw-100 d-flex align-items-center justify-content-center">
      <div>
        <GoogleLogin
          clientId="637229961998-g5bvh8jj55q2ubgvuh7ej17k8no2vnus.apps.googleusercontent.com"
          buttonText="Login"
          theme="dark"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          fetchBasicProfile={true}
        />
      </div>
    </div>
  );
};

export default Login;
