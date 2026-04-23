import { useContext, useEffect, useState } from "react";

import { Link } from "react-router";

import {
    Avatar,
    Button,
    ButtonVariant,
    Divider,
    Dropdown,
    DropdownGroup,
    DropdownItem,
    DropdownList,
    MenuToggle,
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from "@patternfly/react-core";


import { CogIcon } from '@patternfly/react-icons';
import { EllipsisVIcon } from '@patternfly/react-icons';
import { HelpIcon } from '@patternfly/react-icons';
import imgAvatar from '@patternfly/react-core/src/components/assets/avatarImg.svg';
import { QuestionCircleIcon } from '@patternfly/react-icons';


import UserContext from "../../hooks/UserContext";
import { useTheme, THEME_TYPES } from '../../hooks/useTheme';


/** Header Toolbar
 *
 * @param {boolean} isSidebarOpen Is the sidebar open or closed.
 * @param {function} onSidebarToggle Callback to run when the sidbar toggle is press.
 * @returns Useable Toolbar Ready to be placed in the page header.
 */
const HeaderToolbar = () => {


    const user = useContext(UserContext)

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

    const { mode: themeMode, setMode: setThemeMode, modes: colorModes } = useTheme(THEME_TYPES.COLOR);

    useEffect(() => { // AutoMagic set based off of user preferences

        if( Number(user.settings.browser_mode) === 1 ) {    // auto

            setThemeMode(colorModes.SYSTEM);

        } else if( Number(user.settings.browser_mode) === 2 ) {    // Dark

                setThemeMode(colorModes.DARK);

        } else if( Number(user.settings.browser_mode) === 3 ) {    // Light

            setThemeMode(colorModes.LIGHT);

        }

    }, [
        user.settings.browser_mode,
    ])



    const KebabDropdownItems = () => {    // Mobile Menu
            return (
                <>
                    <DropdownItem>
                        <CogIcon />
                        <Link to={String(user.settings._urls._self).split('api/v2')[1]}>
                            Settings
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <HelpIcon />
                        <Link to="https://nofusscomputing.com/projects/centurion_erp/" target="_blank">
                            Help
                        </Link>
                    </DropdownItem>
                </>
            )
        };

    const UserDropdownItems = () => {

        return (
            <>
                <DropdownItem key="group 2 logout">
                    <Link to={'logout'}>Log out</Link>
                </DropdownItem>
            </>
        );
    }

    return (
        <Toolbar id="page-toolbar" isStatic>
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
                    <ToolbarGroup
                        variant="action-group-plain"
                        visibility={{
                            default: 'hidden',
                            lg: 'visible'
                        }}
                    >
                        <ToolbarItem>
                            {user.settings._urls &&
                            <Button
                                aria-label="Settings"
                                component={Link}
                                    to={String(user.settings._urls._self).split('api/v2')[1]}
                                isSettings
                                variant="plain"
                            />}
                        </ToolbarItem>
                        <ToolbarItem>
                            <Button
                                aria-label="Help"
                                component={Link}
                                    to="https://nofusscomputing.com/projects/centurion_erp/"
                                    target="_blank"
                                variant={ButtonVariant.plain}
                                icon={<QuestionCircleIcon />}
                            />
                        </ToolbarItem>

                    </ToolbarGroup>
                    <ToolbarItem>
                        {/* <ThemeSelector id="ws-example-theme-select" /> */}
                    </ToolbarItem>
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
                        <DropdownList>{(user.settings._urls && user.user.display_name) && <KebabDropdownItems />}</DropdownList>
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

                            <DropdownList>
                                {(user.settings._urls && user.user.display_name) && <KebabDropdownItems />}
                            </DropdownList>

                            <Divider />

                            <DropdownGroup key="group 2" aria-label="User actions">
                                {(user.settings._urls && user.user.display_name) && <DropdownList><UserDropdownItems /></DropdownList>}
                            </DropdownGroup>

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
                                {user.user.display_name}
                            </MenuToggle>
                        }
                    >
                        {(user.settings._urls && user.user.display_name) && <DropdownList><UserDropdownItems /></DropdownList>}
                    </Dropdown>
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );

}


export default HeaderToolbar;
