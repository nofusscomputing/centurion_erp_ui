import { useState } from "react";
import { Outlet } from "react-router";

import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";



const RootLayout = ({
    content_heading,
    menu_entries,
    content_header_icon,
}) => {

    const [nav_visible, setNavVisible] = useState(true)

    const [api_version_data, setAPIVersionData] = useState(null)

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
                    api_version_callback={(data) => {

                        setAPIVersionData(data)

                    }}
                />
                <main>
                    <div className="content-header">
                        <div className="column left">&nbsp;</div>
                        <h2 className="column center">{content_heading}</h2>
                        <div className="column right">
                            {content_header_icon}
                        </div>
                    </div>
                    <article>
                        <Outlet />
                    </article>
                    <Footer
                        api_version_data = {api_version_data}
                    />
                </main>
            </div>
        </div>
    );
}

export default RootLayout;
