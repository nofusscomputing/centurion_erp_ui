import {
    Outlet,
    useLoaderData,
} from "react-router";

import {
    Page,
} from "@patternfly/react-core";


import '../../node_modules/@patternfly/patternfly/components/Page/page.css'

import '../../node_modules/@patternfly/patternfly/patternfly.css'


import Header from "../components/page/Header";
import {
    NotificationContextProvider
} from "../components/NotificationDrawer";
import
    Navbar,
    {
        NavbarContextProvider
} from "../components/page/Navbar";

import { UserProvider } from "../hooks/UserContext";



/**
 * This Layout provides the Notifications.
 * 
 * @summary Notification layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const NotificationLayout = (): React.JSX.Element => {

    return (
            <NotificationContextProvider>

                <Outlet />

            </NotificationContextProvider>
    );

};



export default NotificationLayout;
