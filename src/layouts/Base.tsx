import {
    Outlet
} from "react-router";

import {
    UserProvider
} from "../hooks/UserContext"
import React from "react";



/**
 * Base Layout for doing ui related setup tasks.
 * 
 * @summary Base Layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const Base = (): React.JSX.Element => {

    return (
        <UserProvider>

            <Outlet />

        </UserProvider>
    );

};

export default Base;
