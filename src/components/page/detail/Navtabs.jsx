import { Link, useParams } from "react-router";

import IconLoader from "../../IconLoader";



const NavTabs = ({
    tabs = [],
    active_tab = null,
    setActiveTab = null
}) => {

    const params = useParams()

    return (
        <div className="nav-tabs">
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
