import {
    Masthead,
    MastheadContent,
    MastheadMain,
    MastheadToggle,
    PageToggleButton,
    Title,
} from "@patternfly/react-core";

import { Link } from "react-router";
import HeaderToolbar from "./HeaderToolbar";



/** Page Header
 *
 * @param {boolean} isSidebarOpen Is the sidebar open or closed.
 * @param {function} onSidebarToggle Callback to run when the sidbar toggle is press.
 * @returns Page Header ready to be placed on the page.
 */
const Header = ({
    isSidebarOpen,
    onSidebarToggle
}) => {


    return (
        <Masthead>
            <MastheadMain>
                <MastheadToggle>
                    <PageToggleButton
                        isHamburgerButton
                        aria-label="Global navigation"
                        isSidebarOpen={isSidebarOpen}
                        onSidebarToggle={onSidebarToggle}
                        id="fill-nav-toggle"
                    />
                </MastheadToggle>
                <Title headingLevel="h1" className="nfc-text-no-wrap">
                    <Link style={{textDecoration: "none"}} to='/'>Centurion ERP</Link>
                </Title>
            </MastheadMain>
            <MastheadContent>
                <HeaderToolbar />
            </MastheadContent>
        </Masthead>
    );
}


export default Header;
