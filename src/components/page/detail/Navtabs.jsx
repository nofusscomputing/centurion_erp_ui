import { Link, useParams } from "react-router-dom";

const NavTabs = ({
    tabs = [],
    active_tab = null,
    setActiveTab = null
}) => {

    const params = useParams()

    return (
        <div className="nav-tabs">
            <div className="tab back">
                <div>
                    <span className="icon">X</span>
                    <span className="text">
                        <Link to={'/' + params.module + '/' + params.model}>Back to index</Link>
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
                        ) ? 'tab active' : 'tab'}
                        onClick={()=> setActiveTab(tab.name.toLowerCase())}
                    >
                        <div>
                            <span
                                className="text"
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
