import {
    RouterProvider
} from "react-router/dom";

import dynamicRouter from "./router/dynamicRouter";



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

    const router = dynamicRouter();

    return (
        <RouterProvider router={router} />
    );
}

export default App;
