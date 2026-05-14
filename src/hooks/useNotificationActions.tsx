import {
    useContext
} from "react";

import {
    Alert,
    AlertActionCloseButton,
    AlertVariant
} from "@patternfly/react-core";

import { NotificationContext } from "../components/NotificationDrawer";



const getUniqueId = () => crypto.randomUUID();


const getTimeCreated = () => {

    const dateCreated = new Date();

    return dateCreated.toDateString() + ' at ' + ('00' + dateCreated.getHours().toString()).slice(-2) + ':' + ('00' + dateCreated.getMinutes().toString()).slice(-2);
};



/**
 * Alert and Notification Actions
 * 
 * Usage of this hook requires that you have declared a context provider
 * using {@link NotificationContext}.
 * 
 * @summary Actions to interact with notifications.
 * 
 * @category Hook
 * @since 0.9.0
 */
export const useNotificationActions = (): NotificationActions => {

    const {
        alerts, setAlerts,
        alertTimeout,
        isNotificationsOpen,
        setNotifications,
        maxDisplayed
    } = useContext(NotificationContext);


    
    const addNewNotification = (
        title: string,
        description: string,
        variant: AlertVariant,
        isAlert: boolean = false
    ): void => {

        const variantFormatted = variant.charAt(0).toUpperCase() + variant.slice(1);

        const srTitle = variantFormatted + ' alert';

        const key = getUniqueId();

        const timestamp = getTimeCreated();

        setNotifications(prevNotifications => [
            {
                title: title ?? srTitle,
                srTitle,
                variant,
                key,
                timestamp,
                description,
                isNotificationRead: false
            },
            ...prevNotifications
        ]);


        if (!isNotificationsOpen && isAlert) {

            setAlerts(prevAlerts => [
                <Alert
                    variant={variant}
                    title={title ?? srTitle}
                    timeout={alertTimeout}
                    onTimeout={() =>
                        removeAlert(key)
                    }
                    isLiveRegion
                    actionClose={
                        <AlertActionCloseButton
                            title={title}
                            variantLabel={`${variant} alert`}
                            onClose={() =>{
                                removeAlert(key);
                                markNotificationRead(key)
                            }}
                        />
                    }
                    key={key}
                    id={key.toString()}
                >
                    <p>{description}</p>
                </Alert>, ...prevAlerts
            ]);
        }
    };


    const buildOverflowMessage = () => {

        const overflow = alerts.length - maxDisplayed;

        if (overflow > 0 && maxDisplayed > 0) {

            return `View ${overflow} more notification(s) in notification drawer`;

        }

        return '';

    };


    const markNotificationRead = key => {

        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.key === key ? {
                    ...notification,
                    isNotificationRead: true
                }
                : notification
            )
        );
    };


    const removeAlert = key => {

        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.props.id !== key.toString()));
    };


    const removeAllAlerts = () => {
        setAlerts([]);
    };


    return {
        addNewNotification,
        buildOverflowMessage,
        markNotificationRead,
        removeAlert,
        removeAllAlerts
    };
};


/**
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 * 
 */
export interface NotificationActions {

    /**
     * 
     * Creates both a Notification and an Alert.
     * 
     * @summary Create a Notification
     * 
     * @param title - Title to use for the notification.
     * @param description - Description of the notification.
     * @param variant - Type of notification to use.
     * @param isAlert - Make the Notification show up as an 
     * alert.
     * 
     * 
     * @expand
     * @since 0.9.0
     */
    addNewNotification: (
        title: string,
        description: string,
        variant: AlertVariant,
        isAlert?: boolean
    ) => void

    /**
     * 
     * When the number of alerts hits the max allowed to be displayed, this
     * function will create a "summary message" to show that the alerts
     * displayed have been truncated.
     * 
     * Truncated alerts will not be displayed and will automagically appear in
     * the {@link Notifications} drawer.
     * 
     * @summary Creates an Alerts Overflow message 
     * 
     * @since 0.9.0
     * @expand
     */
    buildOverflowMessage: () => void

    /**
     * 
     * Marks a notification that in the {@link Notifications} drawer as read.
     * 
     * @summary Mark a notification as read.
     * 
     * @since 0.9.0
     * @expand
     */
    markNotificationRead: ( key: string ) => void

    /**
     * Removes an alert from the alert state object.
     * 
     * @summary Remove all alerts.
     * 
     * @since 0.9.0
     * @expand
     */
    removeAlert: ( key: string ) => void

    /**
     * Removes all alerts from the alert state object.
     * 
     * @summary Remove all alerts.
     * 
     * @since 0.9.0
     * @expand
     */
    removeAllAlerts: () => void
}
