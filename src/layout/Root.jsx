import { useId, useState } from "react";
import { Outlet } from "react-router";

import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";



const RootLayout = ({
    menu_entries,
}) => {

    const [api_version_data, setAPIVersionData] = useState(null)

    const [nav_visible, setNavVisible] = useState(true)

    const mainId = useId();
    const viewPortId = useId();

    return (
        <div>
            <Header
                nav_visible={nav_visible}
                setNavVisible={setNavVisible}
            />
            <div id={viewPortId} className="view-port">
                <Navbar
                    menu_entries={menu_entries}
                    nav_visible={nav_visible}
                    api_version_callback={(data) => {

                        setAPIVersionData(data)

                    }}
                />

                <main id={mainId} style={{
                    backgroundColor: 'var(--background-colour-inactive);',
                    width: "100%"
                }}>

                    <Outlet />

                    <Footer
                        api_version_data = {api_version_data}
                    />

                </main>
            </div>
        </div>
    );
}

export default RootLayout;
