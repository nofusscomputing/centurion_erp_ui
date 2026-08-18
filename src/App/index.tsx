import {
    useMemo
} from "react";

import {
    RouterProvider
} from "react-router/dom";

import {
    BackendProvider
} from "./providers/backend";
import dynamicRouter from "./router";



/**
 * Adds the routes provided by {@link dynamicRouter}. The RouterProvider will
 * be wrapped in {@link BackendProvider} using the `API_URL` that was provided
 * by the backend.
 * 
 * @summary App Entrypoint
 * 
 * @category Other
 * @since 0.13.0
 */
function App() {

    const router = useMemo( () => dynamicRouter(), [] );

    return (
        <BackendProvider url={window.env.API_URL}>
            <RouterProvider router={router} />
        </BackendProvider>
    );
}

export default App;
