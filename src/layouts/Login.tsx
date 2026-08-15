import LoadingSpinner from "../components/LoadingSpinner";




/**
 * This layout will cause a redirect to the backend's login URL. It's intent
 * is to provide for the user to be able to login.
 * 
 * @summary Login Layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const Login = (): React.JSX.Element => {


    if (!window.env) {
        return <div>Loading...</div>; // Wait until `window.env` is defined
      }
    
      window.location.replace(window.env.API_URL + '/auth/login');


    return (
        <LoadingSpinner titleText = "Login" />
    );

};

export default Login;
