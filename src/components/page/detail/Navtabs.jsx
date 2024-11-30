import { Link, useParams } from "react-router";

import IconLoader from "../../IconLoader";



const NavTabs = ({
    tabs = [],
    back_url,
    active_tab = null,
    setActiveTab = null
}) => {

    const params = useParams()

    return (
        <div className="nav-tabs">
            <div className="nav-tabs-tab back">
                <div>
                    <span className="nav-tabs-icon">
                        <IconLoader name='navdoubleleft' />
                    </span>
                    <span className="nav-tabs-text">
                        <Link to={back_url}>Back to index</Link>
                    </span>
                </div>
            </div>
            { tabs.map((tab, index) => {
                return(
                    <div
                        className={(
                            active_tab == tab.name.toLowerCase()
                            || (
                                active_tab == null
                                && index == 0
                            )
                        ) ? 'nav-tabs-tab active' : 'nav-tabs-tab'}
                        onClick={()=> setActiveTab(tab.name.toLowerCase())}
                    >
                        <div>
                            <span
                                className="nav-tabs-text"
                                id={tab.name.toLowerCase()}
                            >{tab.name}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 
export default NavTabs;
