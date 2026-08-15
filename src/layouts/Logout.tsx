import LoadingSpinner from "../components/LoadingSpinner";
import { apiFetch } from "../hooks/apiFetch";



/**
 * This layout will cause a redirect to the backend's logout url. The intent
 * is that the backend will log the user out.
 * 
 * @summary Logout Layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const Logout = (): React.JSX.Element => {


    const logout = apiFetch(
        window.env.API_URL + '/auth/logout',
        null,
        'POST',
        null,
        false
    )

    window.location.replace( window.env.API_URL + '/auth/login');


    return (
        <LoadingSpinner titleText = "Logout" />
    );

};

export default Logout;
