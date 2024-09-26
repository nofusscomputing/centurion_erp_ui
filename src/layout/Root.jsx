import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";



const RootLayout = ({
    content_heading,
    menu_entries
}) => {

    const [nav_visible, setNavVisible] = useState(true)

    return (
        <div>
            <Header
                nav_visible={nav_visible}
                setNavVisible={setNavVisible}
            />
            <div className="view-port">
                <Navbar
                    menu_entries={menu_entries}
                    nav_visible={nav_visible}
                />
                <main>
                    <div className="content-header">
                        <div className="column left">&nbsp;</div>
                        <h2 className="column center">{content_heading}</h2>
                        <div className="column right">&nbsp;</div>
                    </div>
                    <article>
                        <Outlet />
                    </article>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default RootLayout;
