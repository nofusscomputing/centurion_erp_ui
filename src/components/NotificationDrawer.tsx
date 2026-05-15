import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    Alert,
    AlertGroup,
    AlertVariant,
    Dropdown,
    DropdownItem,
    DropdownList,
    EmptyState,
    EmptyStateBody,
    EmptyStateVariant,
    MenuToggle,
    NotificationDrawer,
    NotificationDrawerBody,
    NotificationDrawerHeader,
    NotificationDrawerList,
    NotificationDrawerListItem,
    NotificationDrawerListItemBody,
    NotificationDrawerListItemHeader
} from "@patternfly/react-core";

import {
    EllipsisVIcon,
    SearchIcon
} from '@patternfly/react-icons';

import {
    useNotificationActions
} from "../hooks/useNotificationActions";



/**
 * @summary Notification Context
 * 
 * @category Context
 * @expand
 * @since 0.9.0
 */
export const NotificationContext = createContext<NotificationContextValue>(null);



/**
 * This component contains the required feature set notification drawer and
 * alerting.
 * 
 * Usage of this component requires that you have declared a context provider
 * using {@link NotificationContext}.
 * 
 * @summary Alerting and Notifications drawer
 * 
 * @category Component
 * @since 0.9.0
 */
export const Notifications = (): React.JSX.Element => {

    const {
        alerts, setAlerts,
        alertTimeout,
        drawerRef,
        isNotificationsOpen, setNotificationsOpen,
        maxDisplayed,
        notifications, setNotifications,
        setOverflowMessage
    } = useContext(NotificationContext);

    const { markNotificationRead } = useNotificationActions();

    const [ openDropdownKey, setOpenDropdownKey ] = useState(null);


    const getUnreadNotificationsNumber = () => notifications.filter(notification => notification.isNotificationRead === false).length;


    const isNotificationRead = key => notifications.find(notification => notification.key === key)?.isNotificationRead;


    const markAllNotificationsRead = () => {
        setNotifications(prevNotifications => prevNotifications.map(notification => ({
        ...notification,
        isNotificationRead: true
        })));
    };


    const onDropdownSelect = () => {
        setOpenDropdownKey(null);
    };


    const onDropdownToggle = id => {
        if (id && openDropdownKey !== id) {
            setOpenDropdownKey(id);
            return;
        }
        setOpenDropdownKey(null);
    };


    const removeAllNotifications = () => {
        setNotifications([]);
    };


    const removeNotification = key => {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.key !== key));
    };


    const notificationDrawerActions = (
        <>
            <DropdownItem key="markAllRead" onClick={markAllNotificationsRead}>
                Mark all read
            </DropdownItem>
            <DropdownItem key="clearAll" onClick={removeAllNotifications}>
                Clear all
            </DropdownItem>
        </>
    );


    const notificationDrawerDropdownItems = key => [
        <DropdownItem key={`markRead-${key}`} onClick={() => markNotificationRead(key)}>
        Mark as read
        </DropdownItem>,
        <DropdownItem key={`clear-${key}`} onClick={() => removeNotification(key)}>
        Clear
        </DropdownItem>
    ];


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!drawerRef.current?.contains(event.target)) {
                setNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <AlertGroup
                isToast
            />
            <NotificationDrawer
                id="notifications-drawer"
                open = {isNotificationsOpen}
                ref={drawerRef}
            >
                <NotificationDrawerHeader
                    count={getUnreadNotificationsNumber()}
                    onClose={_event => setNotificationsOpen(false)}
                >
                    <Dropdown
                        id="notification-drawer-0"
                        isOpen={openDropdownKey === 'dropdown-toggle-id-0'}
                        onSelect={onDropdownSelect}
                        popperProps={{
                            position: 'right'
                        }}
                        onOpenChange={isOpen => !isOpen && setOpenDropdownKey(null)}
                        toggle={toggleRef =>
                            <MenuToggle
                                ref={toggleRef}
                                isExpanded={openDropdownKey === 'dropdown-toggle-id-0'}
                                variant="plain"
                                onClick={() => onDropdownToggle('dropdown-toggle-id-0')}
                                aria-label="Notification drawer actions"
                                icon={<EllipsisVIcon />}
                            />
                        }
                    >
                        <DropdownList>{notificationDrawerActions}</DropdownList>
                    </Dropdown>
                </NotificationDrawerHeader>

                <NotificationDrawerBody>
                    {notifications.length !== 0 && 
                    <NotificationDrawerList>
                        {notifications.map(({key, variant, title, srTitle, description, timestamp}, index) =>
                            <NotificationDrawerListItem
                                key={key}
                                variant={variant}
                                isRead={
                                    isNotificationRead(key)
                                }
                            >
                                <NotificationDrawerListItemHeader
                                    variant={variant}
                                    title={title}
                                    srTitle={srTitle}
                                >
                                    <Dropdown
                                        id={key.toString()}
                                        isOpen={openDropdownKey === key}
                                        onSelect={onDropdownSelect}
                                        popperProps={{
                                            position: 'right'
                                        }}
                                        onOpenChange={isOpen => !isOpen && setOpenDropdownKey(null)}
                                        toggle={toggleRef =>
                                            <MenuToggle
                                                ref={toggleRef}
                                                isExpanded={openDropdownKey === key}
                                                variant="plain"
                                                onClick={() =>
                                                    onDropdownToggle(key)
                                                }
                                                aria-label={`Notification ${index + 1} actions`}
                                                icon={<EllipsisVIcon />}
                                            />
                                        }
                                    >
                                        <DropdownList>{notificationDrawerDropdownItems(key)}</DropdownList>
                                    </Dropdown>
                                </NotificationDrawerListItemHeader>
                                <NotificationDrawerListItemBody timestamp={timestamp}
                                >
                                    {description}
                                </NotificationDrawerListItemBody>
                            </NotificationDrawerListItem>)}
                    </NotificationDrawerList>}
                    {notifications.length === 0 &&
                    <EmptyState
                        headingLevel="h2"
                        titleText="No notifications found"
                        icon={SearchIcon}
                        variant={EmptyStateVariant.full}
                    >
                        <EmptyStateBody>There are currently no notifications.</EmptyStateBody>
                    </EmptyState>}
                </NotificationDrawerBody>
            </NotificationDrawer>
        </>
    );
};



/**
 * A single notification for use within the {@link Notifications} Drawer.
 * 
 * @summary A Notification.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export interface Notification {
    title: string
    srTitle: string
    variant: AlertVariant,
    key: string,
    timestamp: string,
    description: string,
    isNotificationRead: boolean
}



/**
 * 
 * @summary Object for Notification Context.
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export interface NotificationContextValue {
    alerts: Array<typeof Alert>;
    setAlerts: Function;
    alertTimeout: number;
    drawerRef: React.RefObject<any>;
    isNotificationsOpen: boolean;
    maxDisplayed: number;
    notifications: Notification[];
    setNotificationsOpen: Function;
    setNotifications: Function;
    setOverflowMessage: Function
}
