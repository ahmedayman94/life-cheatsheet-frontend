import GoogleLogin from "react-google-login";

const responseGoogle = (response: any) => {
  console.log(response);
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
