import {
    useEffect
} from "react";

import {
    isRouteErrorResponse,
    useNavigate,
    useRouteError
} from "react-router";

import {
    HTTPNotAuthenticated,
    ResponseException
} from "../classes/Exceptions";

import StateSplash, { StateIcon } from "../components/StateSplash";


/**
 * This Layout provides the component for any routes {@link react-router!ErrorBoundary | ErrorBoundary}.
 * 
 * @summary Route Error Boundary
 * 
 * @category Layout
 * @since 0.13.0
 */
const RouteErrorBoundary = (): React.JSX.Element => {

    const error = useRouteError();

    const navigate = useNavigate();

    useEffect(() => {

    if( error instanceof HTTPNotAuthenticated ) {

        navigate('/login')

    }

    }, [error, navigate])

    let message = null;

    let stackTrace = null

    if( isRouteErrorResponse() ){

        message = `${error.name} - ${error.statusText}`;

        stackTrace = error.data?.message ? error.data.message : null;

    } else if( error instanceof ResponseException) { 

        message = error.message;

    } else {

        message = error.message? error.message : error.data;

        stackTrace = error.stack;

    }

    return (
        <>
        <StateSplash
            body = {message}
            stackTrace = {stackTrace}
            icon = {StateIcon.danger}
            titleText = "Well this is awkward"
        />
        </>
    );
}
 
export default RouteErrorBoundary;
