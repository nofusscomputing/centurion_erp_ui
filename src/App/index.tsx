import {
    useMemo
} from "react";

import {
    RouterProvider
} from "react-router/dom";

import dynamicRouter from "./router";



/**
 * Adds the routes provided by {@link dynamicRouter}
 * 
 * @summary App Entrypoint
 * 
 * @category Other
 * @since 0.13.0
 */
function App() {

    const router = useMemo( () => dynamicRouter(), [] );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
