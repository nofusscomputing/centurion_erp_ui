
import {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from "react-router";

import {
    Nav, NavExpandable, NavItem, NavList,
    PageSidebar,
    PageSidebarBody
} from "@patternfly/react-core";

import { apiFetch } from "../../hooks/apiFetch";


/** Site Page Navigation
 * 
 * @param {boolean} isSidebarOpen Is the sidebar open?
 * @returns 
 */
const Navbar = ({
   isSidebarOpen
}) => {

    const [ navigation, SetNavigationEntries ] = useState([])

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        if( navigation.length === 0 ) {

            let response = apiFetch(
                '',
                (data) => {

                    SetNavigationEntries(data.navigation)

                    // api_version_callback(data.version)

                },
                'OPTIONS'
            )

                .then(response => {

                    if( response.status === 401 ) {
                        navigate('/login')
                    }
                })
        }
    },[])



    const [activeGroup, setActiveGroup] = useState(null);

    const [activeItem, setActiveItem] = useState(null);


    useEffect(() => {

        if( navigation ) {

            let index = 0;
            for(let menu of navigation) {

                let page_index = 0;

                for(let page of menu.pages) {

                    if( String(location.pathname).startsWith( page.link ) ) {

                        const groupID = `navigation-${menu.name}-${index}`
                        const ItemID = `${groupID}_${page.name}-${page_index}`

                        setActiveGroup(groupID);
                        setActiveItem(ItemID);

                    }

                    page_index ++;
                }

                index ++;

            }
        }

    }, [
        location.pathname,
        navigation,
    ])


    const onSelect = (_event, result) => {
        setActiveGroup(result.groupId);
        setActiveItem(result.itemId);
    };

    const onToggle = (_event, result) => {
        console.debug(`Group ${result.groupId} expanded? ${result.isExpanded}`);
    };


    return (
        <PageSidebar isSidebarOpen={isSidebarOpen} id="fill-sidebar">
            <PageSidebarBody>
                <Nav onSelect={onSelect} onToggle={onToggle} aria-label="Expandable global">
                    <NavList>
                        {navigation && navigation.map((module, index) => {

                            const groupId = `navigation-${module.name}-${index}`

                            return (
                                <NavExpandable
                                    title={module.display_name}
                                    groupId={`navigation-${module.name}-${index}`}
                                    isActive={activeGroup === groupId}
                                    isExpanded={activeGroup === groupId}
                                    key={`navigation-${module.name}-${index}`}
                                >
                                    {module.pages.map((page, page_index) => {

                                        return (

                                            <NavItem
                                                id={`${groupId}_${page.name}`}
                                                groupId={groupId}
                                                itemId={`${groupId}_${page.name}-${page_index}`}
                                                key={`${groupId}_${page.name}-${page_index}`}
                                                isActive={activeItem === `${groupId}_${page.name}-${page_index}`}
                                            >
                                                <Link to={page.link}>{page.display_name}</Link>
                                            </NavItem>
                                        );
                                    })}
                                </NavExpandable>
                            )
                        })}
                    </NavList>
                </Nav>
            </PageSidebarBody>
        </PageSidebar>
    );
}
 
export default Navbar;
