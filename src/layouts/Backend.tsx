import {
    Outlet,
} from "react-router";

import {
    BackendProvider
} from "../App/providers/backend";



/**
 * This layout is intended to be the component on any route that contains
 * handle `backend_url`. This is so that every child layout can obtain the
 * correct backend details.
 * 
 * @summary Backend layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const BackendLayout = (): React.JSX.Element => {

    return (
        <BackendProvider>

            <Outlet />

        </BackendProvider>
    );

};



export default BackendLayout;
