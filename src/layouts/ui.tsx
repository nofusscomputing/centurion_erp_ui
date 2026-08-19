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
 * This Layout provides the sites rendered layout. That is everything not common to the
 * {@link PageContent} layout.
 * 
 * @summary Site layout
 * 
 * @category Layout
 * @since 0.13.0
 */
const UI = (): React.JSX.Element => {

    const { metadata: rootMetadata } = useLoaderData();


    return (
        <UserProvider>

            <NotificationContextProvider>

                <NavbarContextProvider>

                    <Page
                        isContentFilled
                        isManagedSidebar
                        mainContainerId={"scrollable-element"}
                        masthead = {<Header />}
                        sidebar = {<Navbar
                            apiMetadata = {rootMetadata}
                        />}
                    >

                        {rootMetadata && <Outlet />}

                    </Page>

                </NavbarContextProvider>

            </NotificationContextProvider>

        </UserProvider>
    );

};



export default UI;
