import { useState } from "react";
import { Outlet } from "react-router";


import {
    Page,
} from '@patternfly/react-core';
import '../../node_modules/@patternfly/patternfly/patternfly.css'


import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";


const RootLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const onSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <Page
            isManagedSidebar
            isContentFilled
            masthead={<Header
                isSidebarOpen = {isSidebarOpen}
                onSidebarToggle = {onSidebarToggle}
            />}
            sidebar={<Navbar
                isSidebarOpen = {isSidebarOpen}
            />}
        >
            <Outlet />
            
            <Footer />
        </Page>
    );
}

export default RootLayout;
