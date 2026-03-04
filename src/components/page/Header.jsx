import { useState } from "react";

import {
    Avatar,
    Button,
    ButtonVariant,
    Divider,
    Dropdown,
    DropdownGroup,
    DropdownItem,
    DropdownList,
    Masthead,
    MastheadBrand,
    MastheadContent,
    MastheadLogo,
    MastheadMain,
    MastheadToggle,
    MenuToggle,
    // NotificationBadge,
    // NotificationBadgeVariant,
    PageToggleButton,
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from "@patternfly/react-core";


import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import imgAvatar from '@patternfly/react-core/src/components/assets/avatarImg.svg';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';

import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon'
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon'






/** Page Header
 *
 * @param {boolean} isSidebarOpen Is the sidebar open or closed.
 * @param {function} onSidebarToggle Callback to run when the sidbar toggle is press.
 * @returns 
 */
const Header = ({
    isSidebarOpen,
    onSidebarToggle
}) => {


    const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);

    const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onKebabDropdownSelect = () => {
        setIsKebabDropdownOpen(false);
    };

    const onFullKebabDropdownSelect = () => {
        setIsFullKebabDropdownOpen(false);
    };

    const onDropdownSelect = () => {
        setIsDropdownOpen(false);
    };


    const onKebabDropdownToggle = () => {
        setIsKebabDropdownOpen(!isKebabDropdownOpen);
    };

    const onFullKebabDropdownToggle = () => {
        setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
    };

    const onDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



  const kebabDropdownItems = (
        <>
        <DropdownItem>
            <CogIcon /> Settings
        </DropdownItem>
        <DropdownItem>
            <HelpIcon /> Help
        </DropdownItem>
        </>
    );

    const userDropdownItems = (
        <>
        <DropdownItem key="group 2 profile">My profile</DropdownItem>
        <DropdownItem key="group 2 user">User management</DropdownItem>
        <DropdownItem key="group 2 logout">Logout</DropdownItem>
        </>
    );


    const headerToolbar = (
        <Toolbar id="toolbar" isStatic>
            <ToolbarContent>
                <ToolbarGroup
                    variant="action-group-plain"
                    align={{
                        default: 'alignEnd'
                    }}
                    gap={{
                        default: 'gapNone',
                        md: 'gapMd'
                    }}
                >
                    {/* <ToolbarItem>
                        <NotificationBadge aria-label="Notifications" variant={NotificationBadgeVariant.read} onClick={() => {}} />
                    </ToolbarItem> */}
                    <ToolbarGroup
                        variant="action-group-plain"
                        visibility={{
                            default: 'hidden',
                            lg: 'visible'
                        }}
                    >
                        <ToolbarItem>
                            <Button aria-label="Settings" isSettings variant="plain" />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
                        </ToolbarItem>

                    </ToolbarGroup>
                    {/* <ToolbarItem>
                        <ThemeSelector id="ws-example-theme-select" />
                    </ToolbarItem> */}
                    <ToolbarItem
                        visibility={{
                            default: 'hidden',
                            md: 'visible',
                            lg: 'hidden'
                        }}
                    >
                        <Dropdown
                            isOpen={isKebabDropdownOpen}
                            onSelect={onKebabDropdownSelect}
                            onOpenChange={isOpen => setIsKebabDropdownOpen(isOpen)}
                            popperProps={{
                                position: 'right'
                            }}
                            toggle={toggleRef => <MenuToggle
                                ref={toggleRef}
                                onClick={onKebabDropdownToggle}
                                isExpanded={isKebabDropdownOpen}
                                variant="plain"
                                aria-label="Settings and help"
                                icon={<EllipsisVIcon />}
                            />}
                        >
                        <DropdownList>{kebabDropdownItems}</DropdownList>
                        </Dropdown>
                    </ToolbarItem>
                    <ToolbarItem
                        visibility={{
                            md: 'hidden'
                        }}
                    >
                        <Dropdown
                            isOpen={isFullKebabDropdownOpen}
                            onSelect={onFullKebabDropdownSelect}
                            onOpenChange={isOpen => setIsFullKebabDropdownOpen(isOpen)}
                            popperProps={{
                                position: 'right'
                            }}
                            toggle={toggleRef => <MenuToggle
                                ref={toggleRef}
                                onClick={onFullKebabDropdownToggle}
                                isExpanded={isFullKebabDropdownOpen}
                                variant="plain"
                                aria-label="Toolbar menu"
                                icon={<EllipsisVIcon />}
                            />}
                        >
                        <DropdownGroup key="group 2" aria-label="User actions">
                            <DropdownList>{userDropdownItems}</DropdownList>
                        </DropdownGroup>
                        <Divider />
                        <DropdownList>{kebabDropdownItems}</DropdownList>
                        </Dropdown>
                    </ToolbarItem>
                </ToolbarGroup>
                <ToolbarItem visibility={{
                    default: 'hidden',
                    md: 'visible'
                }}>
                    <Dropdown
                        isOpen={isDropdownOpen}
                        onSelect={onDropdownSelect}
                        onOpenChange={isOpen => setIsDropdownOpen(isOpen)}
                        popperProps={{
                            position: 'right'
                        }}
                        toggle={toggleRef => <MenuToggle
                                ref={toggleRef}
                                onClick={onDropdownToggle}
                                isExpanded={isDropdownOpen}
                                icon={<Avatar src={imgAvatar} alt="" size="sm" />}
                            >
                                Ned Username
                            </MenuToggle>
                        }
                    >
                        <DropdownList>{userDropdownItems}</DropdownList>
                    </Dropdown>
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );


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
                <h1>
                    <Link to='/'>Centurion ERP</Link>
                </h1>
            </MastheadMain>
            <MastheadContent>{headerToolbar}</MastheadContent>
        </Masthead>
    );
}


export default Header;
