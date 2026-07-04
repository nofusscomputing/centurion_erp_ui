
import {
    useEffect,
    useState
} from 'react';

import {
    Link,
    useLocation,
} from "react-router";

import {
    Nav, NavExpandable, NavItem, NavList,
    PageSidebar,
    PageSidebarBody
} from "@patternfly/react-core";

import IconLoader from '../IconLoader';



/**
 * @summary Props for the Navbar component
 * 
 * @category Props
 * @since 0.1.0
 */
export type NavbarProps = {

    /**
     * Is the sidebar open?
     */
    isSidebarOpen: boolean

    navigation_entries: Array<object>
}



/**
 * 
 * Renders the complete site navigation in a sidebar.
 * 
 * @summary Site Page Navigation
 * 
 * @category Component
 * @since 0.1.0 
 */
const Navbar = ({
   isSidebarOpen,
   navigation_entries,
}: NavbarProps) => {

    const [activeGroup, setActiveGroup] = useState(null);

    const [activeItem, setActiveItem] = useState(null);

    const location = useLocation();

    const [ navigation, SetNavigationEntries ] = useState(navigation_entries)


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
                                    title={(
                                        <>
                                            <IconLoader
                                                name = {'icon' in module ? String(module.icon) : String(module.name)}
                                                size = "lg"
                                            />
                                            <span style={{marginRight: "var(--pf-v6-c-nav__link--ColumnGap)"}}></span>
                                            {module.display_name}
                                        </>
                                    )}
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
                                                icon={
                                                    <IconLoader
                                                        id={`${groupId}_${page.name}`}
                                                        name = {'icon' in page ? String(page.icon) : String(page.name)}
                                                        size = "lg"
                                                    />
                                                }
                                                component={(props) => <Link children={props.children.filter(v => v !== null && v !== undefined)} className={props.className} to={page.link}/>}
                                            >
                                                {page.display_name}
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
