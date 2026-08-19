import { useMatches } from "react-router";
import StateSplash, { StateIcon } from "../components/StateSplash";
import { apiFetch } from "../hooks/apiFetch";
import useDjangoFetcher from "../hooks/useDjangoFetcher";



/**
 * This layout will cause a redirect to another URL, replacing the history with
 * the url that was redirected to.
 * 
 * When defining the route for this layout, **ensure** that the route is
 * defined with an `id`. The id is used within the {@link StateSplash} text
 * in format `Redirect ${id}`.
 * 
 * @example
 * 
 * To log a user in, set `url_redirect` to the backends login url.
 * 
 * ``` js
 * 
 * {
 *      id: "login",
 *      path: "login",
 *      Component: components['redirect'],
 *      handle: {
 *          url_redirect: `${window.env.API_URL}/auth/login`
 *      }
 * }
 * 
 * ```
 * 
 * To log a user out where the backend requires method `POST` be used, ensure
 * you set `url_post`
 * 
 * ``` js
 * 
 * {
 *      id: "logout",
 *      path: "logout",
 *      Component: components['redirect'],
 *      handle: {
 *          url_post: `${window.env.API_URL}/auth/logout`,
 *          url_redirect: `${window.env.API_URL}/auth/login`
 *      }
 * }
 * 
 * ```
 * 
 * @summary Redirect Layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const Redirect = (): React.JSX.Element => {


    const routesData = useMatches();

    const routeData = routesData[ ( routesData.length - 1 ) ]

    if( routeData.handle?.url_post ) {

        const logout = useDjangoFetcher({
            url: routeData.handle.url_post,
            body: '',
            method: "POST"
        })

    }

    window.location.replace( routeData.handle.url_redirect );

    return (
        <StateSplash titleText = {`Redirect ${routesData.id}`} icon = {StateIcon.loading} />
    );

};

export default Redirect;
