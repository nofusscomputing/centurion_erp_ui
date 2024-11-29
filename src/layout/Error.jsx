import { isRouteErrorResponse, useRouteError} from "react-router";
import { ResponseException } from "../classes/Exceptions";



const ErrorPage = () => {

    const error = useRouteError();

    if( isRouteErrorResponse() ){ 

        return (
            <section className="error">
                <h2>Error</h2>
                <p>{error.name}</p>
                <h3>Status</h3>
                <p>{error.statusText}</p>
                <h3>Message</h3>
                {error.data?.message && <p>{error.data.message}</p>}
            </section>
        );

    } else if( error instanceof ResponseException) { 

        return (
            <section className="error">
                <h2>Error</h2>
                <p></p>
                <h3>Message</h3>
                <p>{error.message}</p>

            </section>
        );

    } else {

        return (
            <section className="error">
                <h2>Error</h2>
                <p></p>
                <h3>Message</h3>
                <p>{error.message}</p>
                <h3>Trace</h3>
                <pre style={{
                    width: '50%'
                }}>
                    { error.stack }
                </pre>
            </section>
        );
    }
}
 
export default ErrorPage;
