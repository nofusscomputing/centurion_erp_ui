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


/**
 * Props for the Header Component
 * 
 * @category Props
 * @expand
 * @since 0.1.0
 */
export type HeaderProps = {

    /**
     * Is the sidebar open or closed.
     */
    isSidebarOpen: boolean,

    /**
     * Callback to run when the sidebar toggle is press.
     */
    onSidebarToggle: () => void
}



/** 
 * Site Header
 * 
 * Contains the Sites header bar that is rendered as part of every page.
 *
 * @category Component
 * @since 0.1.0
 */
const Header = ({
    isSidebarOpen,
    onSidebarToggle
}: HeaderProps): React.JSX.Element => {


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
