
jest.mock('../../../components/IconLoader', () => {

    const IconLoader = ({
        fill = '#FFF',
        name = null,
        height = '40px',
        width = '40px',
        class_name = null,
        ...kwargs
    }) => {
        
        return (<></>)
    }


    return {
        __esModule: true,
        default: IconLoader,
    };
});



jest.mock('../../../hooks/UserContext', () => {

    const React = require('react');

    const UserContext = React.createContext();

    const UserProvider = ({ children }) => {

        let contextData = {
            user: {},
            settings: {}
        };

        const demoRootPath = `${process.cwd()}/includes/usr/share/nginx/html/mock/api/v2`;

        try {

            const settingsRaw = require('fs').readFileSync(
                `${demoRootPath}/settings/user_settings/1/GET.json`,
                'utf-8'
            );

            const userRaw = require('fs').readFileSync(
                `${demoRootPath}/base/user/1/GET.json`,
                'utf-8'
            );

            contextData.settings = JSON.parse(settingsRaw);
            contextData.user = JSON.parse(userRaw);

        } catch (err) {
            // fallback already empty
        }

        return React.createElement(
            UserContext.Provider,
            { value: contextData },
            children
        );
    };


    return {
        __esModule: true,
        default: UserContext,
        UserProvider
    };

});


import { useContext, useEffect, useRef, useState } from "react";

import {
    render,
    screen,
    waitFor,
} from "@testing-library/react"

import {
    createRoutesStub,
    MemoryRouter,
} from 'react-router'

// import Detail from "../../Detail"
// import RootLayout from "../../Root"
// import { UserProvider } from "../../../hooks/UserContext"

// import { Page } from "@patternfly/react-core";
import { NotificationContext } from "../../NotificationDrawer";
import Header from "../../page/Header";
import { UserProvider } from "../../../hooks/UserContext";
import { useNotificationActions } from "../../../hooks/useNotificationActions";
import { AlertVariant } from "@patternfly/react-core";
import RootLayout from "../../../layout/Root";
import userEvent from "@testing-library/user-event";
// import List from "../../../layout/List";


const fs = require('fs')
const path = require('path')


describe("NotificationDrawer", () => {

    const baseDir = path.join(__dirname, '../../../../includes/usr/share/nginx/html/mock/api/v2')


    let consoleErrorSpy;

    const allowedErrors = [];

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });



    const listBaseDir = path.join(baseDir, '/layout')

    const listIds = fs.readdirSync(listBaseDir)

    const listLayout = listIds
        .filter(viewName => [ 'table' ].includes(viewName))
        .map(viewName => {
        

        const filePath = path.join(listBaseDir, viewName, 'GET.json')

        const raw = fs.readFileSync(filePath, 'utf8')

        const json = JSON.parse(raw)

        const optionsFilePath = path.join(listBaseDir, viewName, 'OPTIONS.json')

        const rawOptions = fs.readFileSync(optionsFilePath, 'utf8')

        const jsonOptions = JSON.parse(rawOptions)


        return {
            data: json,
            options: jsonOptions
        }

    })

    const {data: objectData, options: objectMetadata } = listLayout[0]

    const unreadNotification = {
        title: "a title",
        srTitle: "another",
        variant: AlertVariant.info,
        key: "rand-key",
        timestamp: "a timestamp",
        description: "a description",
        isNotificationRead: false
    };


    test("Has action menu", () => {


        const loader = async () => {

            return {
                page_data: objectData,
                metadata: objectMetadata
            };
        }


        const InnerComponent = () => {

            const {
                alerts, setAlerts,
                alertTimeout,
                drawerRef,
                isNotificationsOpen, setNotificationsOpen,
                maxDisplayed,
                notifications, setNotifications,
                setOverflowMessage
            } = useContext(NotificationContext);

            useEffect(() => {

                setNotifications([ unreadNotification ])

                setNotificationsOpen(true)

            }, [isNotificationsOpen]);

            return (<span>text {isNotificationsOpen}</span>);
        };


        const Stub = createRoutesStub([
            {
                Component: RootLayout,
                children: [
                    {
                        path: objectMetadata.urls.self,
                        Component: InnerComponent,
                    }
                ],
            }
        ]);


        const rendered = render(
            <UserProvider>
                <Stub initialEntries={[objectMetadata.urls.self]} />
            </UserProvider>
        );

        const notifications = rendered.baseElement.querySelector('div[class="pf-v6-c-notification-drawer__header"]');

        const actionButton = notifications.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')

        expect(actionButton).not.toBe(null)


        // No errors are to be thrown
        expect(consoleErrorSpy).not.toHaveBeenCalled();


    });


    describe("Action Menu", () => {


        test("'Mark all as read' updates message format as read", async () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notificationDrawerHeader = rendered.baseElement.querySelector('div[class="pf-v6-c-notification-drawer__header"]');

            const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const actionButton = notificationDrawerHeader.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')

            const user = userEvent.setup();

            await user.click(actionButton);


            const readButton = screen.getByText(/Mark all read/i);

            await user.click(readButton);


            const notification = await notifications.querySelector('li');


            expect(notification).toHaveClass('pf-m-read')


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });


        test("'Clear all' Removes all notifications", async () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notificationDrawerHeader = rendered.baseElement.querySelector('div[class="pf-v6-c-notification-drawer__header"]');

            // const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const actionButton = notificationDrawerHeader.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')

            const user = userEvent.setup();

            await user.click(actionButton);


            const clearButton = screen.getByText(/Clear all/i);

            await user.click(clearButton);


            const clearedNotifications = await rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');


            expect(clearedNotifications).toBe(null);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });

    });

    describe("Notification", () => {


        describe("Action Menu", () => {

            test("'Clear' removes the message", async () => {


                const loader = async () => {

                    return {
                        page_data: objectData,
                        metadata: objectMetadata
                    };
                }


                const InnerComponent = () => {

                    const {
                        alerts, setAlerts,
                        alertTimeout,
                        drawerRef,
                        isNotificationsOpen, setNotificationsOpen,
                        maxDisplayed,
                        notifications, setNotifications,
                        setOverflowMessage
                    } = useContext(NotificationContext);

                    useEffect(() => {

                        setNotifications([ unreadNotification ])

                        setNotificationsOpen(true)

                    }, [isNotificationsOpen]);

                    return (<span>text {isNotificationsOpen}</span>);
                };


                const Stub = createRoutesStub([
                    {
                        Component: RootLayout,
                        children: [
                            {
                                path: objectMetadata.urls.self,
                                Component: InnerComponent,
                            }
                        ],
                    }
                ]);


                const rendered = render(
                    <UserProvider>
                        <Stub initialEntries={[objectMetadata.urls.self]} />
                    </UserProvider>
                );


                const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

                const notification = notifications.querySelector('li');

                const notificationActions = notifications.querySelector('div[class="pf-v6-c-notification-drawer__list-item-action"]');

                const actionButton = notificationActions.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')


                const user = userEvent.setup();

                await user.click(actionButton);


                const readButton = screen.getByText(/Clear/i)

                await user.click(readButton);

                const clearedNotifications = await rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');


                expect(clearedNotifications).toBe(null)

                // No errors are to be thrown
                expect(consoleErrorSpy).not.toHaveBeenCalled();


            });


            test("'Mark as Read' updates message formatting as read", async () => {


                const loader = async () => {

                    return {
                        page_data: objectData,
                        metadata: objectMetadata
                    };
                }


                const InnerComponent = () => {

                    const {
                        alerts, setAlerts,
                        alertTimeout,
                        drawerRef,
                        isNotificationsOpen, setNotificationsOpen,
                        maxDisplayed,
                        notifications, setNotifications,
                        setOverflowMessage
                    } = useContext(NotificationContext);

                    useEffect(() => {

                        setNotifications([ unreadNotification ])

                        setNotificationsOpen(true)

                    }, [isNotificationsOpen]);

                    return (<span>text {isNotificationsOpen}</span>);
                };


                const Stub = createRoutesStub([
                    {
                        Component: RootLayout,
                        children: [
                            {
                                path: objectMetadata.urls.self,
                                Component: InnerComponent,
                            }
                        ],
                    }
                ]);


                const rendered = render(
                    <UserProvider>
                        <Stub initialEntries={[objectMetadata.urls.self]} />
                    </UserProvider>
                );


                const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

                const notification = notifications.querySelector('li');

                const notificationActions = notifications.querySelector('div[class="pf-v6-c-notification-drawer__list-item-action"]');

                const actionButton = notificationActions.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')


                const user = userEvent.setup();

                await user.click(actionButton);


                const readButton = screen.getByText(/Mark as read/i)

                await user.click(readButton);


                expect(notification).toHaveClass('pf-m-read')


                // No errors are to be thrown
                expect(consoleErrorSpy).not.toHaveBeenCalled();


            });

        });


        test("Has action menu", () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const notification = notifications.querySelector('li');

            const notificationActions = notifications.querySelector('div[class="pf-v6-c-notification-drawer__list-item-action"]');

            const actionButton = notificationActions.querySelector('button[class="pf-v6-c-menu-toggle pf-m-plain"]')

            expect(actionButton).not.toBe(null)


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });


        test("Has a title", () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const notification = notifications.querySelector('li[class="pf-v6-c-notification-drawer__list-item pf-m-hoverable pf-m-info"]');

            expect(
                screen.getByText(new RegExp(unreadNotification.title, "i"))
            ).toBeInTheDocument();


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });


        test("Has a description", () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const notification = notifications.querySelector('li[class="pf-v6-c-notification-drawer__list-item pf-m-hoverable pf-m-info"]');

            expect(
                screen.getByText(new RegExp(unreadNotification.description, "i"))
            ).toBeInTheDocument();


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });


        test("Has a date-time", () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                    setNotificationsOpen(true)

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const notifications = rendered.baseElement.querySelector('ul[class="pf-v6-c-notification-drawer__list"]');

            const notification = notifications.querySelector('li[class="pf-v6-c-notification-drawer__list-item pf-m-hoverable pf-m-info"]');

            expect(
                screen.getByText(new RegExp(unreadNotification.timestamp, "i"))
            ).toBeInTheDocument();


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


    });


    describe("Root Layout", () => {


        test("Contains Alert Toast", async () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                return (<></>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );


            const htmlElement = rendered.baseElement.querySelector('ul[class="pf-v6-c-alert-group pf-m-toast"]');


            expect(htmlElement).not.toBe(null);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("Contains Notification Drawer", async () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                        alerts, setAlerts,
                        alertTimeout,
                        isNotificationsOpen, setNotificationsOpen,
                        setNotifications,
                        maxDisplayed
                    } = useContext(NotificationContext);

                useEffect(() => {

                    setNotificationsOpen(true)

                }, []);

                return (<span>{isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );


            const htmlElement = rendered.baseElement.querySelector('div[id="notifications-drawer"]');


            expect(htmlElement).not.toBe(null);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


    });


    describe("Notification Badge", () => {


        test("Unread notifications badge indicator colour 'unread'", () => {


            const MockComponent = ({children}) => {

                const alertTimeout = 8000;

                const drawerRef = useRef(null);

                const maxDisplayedAlerts = 2;

                const maxAlerts = 100;

                const minAlerts = 0;

                const [ alerts, setAlerts ] = useState([])

                const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

                const [ maxDisplayed, setMaxDisplayed ] = useState(maxDisplayedAlerts);

                const [ overflowMessage, setOverflowMessage ] = useState('');

                const [ notifications, setNotifications ] = useState([ unreadNotification ]);

                return (
                    <NotificationContext.Provider
                        value = {{
                            alerts, setAlerts,
                            alertTimeout,
                            drawerRef,
                            isNotificationsOpen, setNotificationsOpen,
                            maxDisplayed,
                            notifications, setNotifications,
                            setOverflowMessage
                        }}
                    >
                        <Header />
                        {children}
                    </NotificationContext.Provider>
                );


            };


            const rendered = render(
                <MemoryRouter>
                    <UserProvider>
                        <MockComponent />
                    </UserProvider>
                </MemoryRouter>
            );


            const htmlElement = rendered.container.querySelector('button[aria-label="Notifications"]');

            expect(String(htmlElement.classList).includes('pf-m-unread')).toBe(true);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("Unread notifications badge indicator colour 'alert'", () => {


            const MockComponent = ({children}) => {

                const alertTimeout = 8000;

                const drawerRef = useRef(null);

                const maxDisplayedAlerts = 2;

                const maxAlerts = 100;

                const minAlerts = 0;

                const [ alerts, setAlerts ] = useState([])

                const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

                const [ maxDisplayed, setMaxDisplayed ] = useState(maxDisplayedAlerts);

                const [ overflowMessage, setOverflowMessage ] = useState('');

                const alertNotification = {
                    ...unreadNotification,
                    variant: AlertVariant.danger
                }

                const [ notifications, setNotifications ] = useState([ alertNotification ]);

                return (
                    <NotificationContext.Provider
                        value = {{
                            alerts, setAlerts,
                            alertTimeout,
                            drawerRef,
                            isNotificationsOpen, setNotificationsOpen,
                            maxDisplayed,
                            notifications, setNotifications,
                            setOverflowMessage
                        }}
                    >
                        <Header />
                        {children}
                    </NotificationContext.Provider>
                );


            };


            const rendered = render(
                <MemoryRouter>
                    <UserProvider>
                        <MockComponent />
                    </UserProvider>
                </MemoryRouter>
            );


            const htmlElement = rendered.container.querySelector('button[aria-label="Notifications"]');

            expect(String(htmlElement.classList).includes('pf-m-attention')).toBe(true);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("Clearing notifications badge indicator colour 'read'", async () => {


            const MockComponent = ({children}) => {

                const alertTimeout = 8000;

                const drawerRef = useRef(null);

                const maxDisplayedAlerts = 2;

                const maxAlerts = 100;

                const minAlerts = 0;

                const [ alerts, setAlerts ] = useState([])

                const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

                const [ maxDisplayed, setMaxDisplayed ] = useState(maxDisplayedAlerts);

                const [ overflowMessage, setOverflowMessage ] = useState('');

                const [ notifications, setNotifications ] = useState([ unreadNotification ]);


                return (
                    <NotificationContext.Provider
                        value = {{
                            alerts, setAlerts,
                            alertTimeout,
                            drawerRef,
                            isNotificationsOpen, setNotificationsOpen,
                            maxDisplayed,
                            notifications, setNotifications,
                            setOverflowMessage
                        }}
                    >
                        <Header />
                        {children}
                    </NotificationContext.Provider>
                );


            };

            const InnerComponent = () => {

                const { setNotifications } = useContext(NotificationContext);

                let done = false

                useEffect(()=> {

                    setNotifications([]);

                }, []);

                return (<></>);
            };


            const rendered = render(
                <MemoryRouter>
                    <UserProvider>
                        <MockComponent>
                            <InnerComponent />
                        </MockComponent>
                    </UserProvider>
                </MemoryRouter>
            );

            const htmlElement = rendered.container.querySelector('button[aria-label="Notifications"]');

            await waitFor(() => {

                expect(
                    screen.getByRole("button", { name: /notifications/i })
                ).toHaveClass("pf-m-read");

            });


            expect(String(htmlElement.classList).includes('pf-m-read')).toBe(true);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("Unread message count shows for one unread message", () => {


            const MockComponent = ({children}) => {

                const alertTimeout = 8000;

                const drawerRef = useRef(null);

                const maxDisplayedAlerts = 2;

                const maxAlerts = 100;

                const minAlerts = 0;

                const [ alerts, setAlerts ] = useState([])

                const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

                const [ maxDisplayed, setMaxDisplayed ] = useState(maxDisplayedAlerts);

                const [ overflowMessage, setOverflowMessage ] = useState('');

                const [ notifications, setNotifications ] = useState([ unreadNotification ]);

                return (
                    <NotificationContext.Provider
                        value = {{
                            alerts, setAlerts,
                            alertTimeout,
                            drawerRef,
                            isNotificationsOpen, setNotificationsOpen,
                            maxDisplayed,
                            notifications, setNotifications,
                            setOverflowMessage
                        }}
                    >
                        <Header />
                        {children}
                    </NotificationContext.Provider>
                );


            };


            const rendered = render(
                <MemoryRouter>
                    <UserProvider>
                        <MockComponent />
                    </UserProvider>
                </MemoryRouter>
            );


            const htmlElement = rendered.container.querySelector('span[class="pf-v6-c-button__text"]');

            expect(htmlElement.innerHTML).toBe("1");


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("No unread message count shows for one read message", () => {


            const MockComponent = ({children}) => {

                const alertTimeout = 8000;

                const drawerRef = useRef(null);

                const maxDisplayedAlerts = 2;

                const maxAlerts = 100;

                const minAlerts = 0;

                const [ alerts, setAlerts ] = useState([])

                const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

                const [ maxDisplayed, setMaxDisplayed ] = useState(maxDisplayedAlerts);

                const [ overflowMessage, setOverflowMessage ] = useState('');

                const [ notifications, setNotifications ] = useState([ {...unreadNotification, isNotificationRead: true} ]);

                return (
                    <NotificationContext.Provider
                        value = {{
                            alerts, setAlerts,
                            alertTimeout,
                            drawerRef,
                            isNotificationsOpen, setNotificationsOpen,
                            maxDisplayed,
                            notifications, setNotifications,
                            setOverflowMessage
                        }}
                    >
                        <Header />
                        {children}
                    </NotificationContext.Provider>
                );


            };


            const rendered = render(
                <MemoryRouter>
                    <UserProvider>
                        <MockComponent />
                    </UserProvider>
                </MemoryRouter>
            );


            const htmlElement = rendered.container.querySelector('span[class="pf-v6-c-button__text"]');

            expect(htmlElement).toBe(null);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("'click on' Opens NotificationDrawer", async () => {


            const loader = async () => {

                return {
                    page_data: objectData,
                    metadata: objectMetadata
                };
            }


            const InnerComponent = () => {

                const {
                    alerts, setAlerts,
                    alertTimeout,
                    drawerRef,
                    isNotificationsOpen, setNotificationsOpen,
                    maxDisplayed,
                    notifications, setNotifications,
                    setOverflowMessage
                } = useContext(NotificationContext);

                useEffect(() => {

                    setNotifications([ unreadNotification ])

                }, [isNotificationsOpen]);

                return (<span>text {isNotificationsOpen}</span>);
            };


            const Stub = createRoutesStub([
                {
                    Component: RootLayout,
                    children: [
                        {
                            path: objectMetadata.urls.self,
                            Component: InnerComponent,
                        }
                    ],
                }
            ]);


            const rendered = render(
                <UserProvider>
                    <Stub initialEntries={[objectMetadata.urls.self]} />
                </UserProvider>
            );

            const htmlElement = rendered.container.querySelector('button[aria-label="Notifications"]');

            expect(
                rendered.baseElement.querySelector('div[id="notifications-drawer"]')
            ).toBe(null);    // Ensure not open

            const user = userEvent.setup();

            await user.click(htmlElement);

            const notificationDrawer = await rendered.baseElement.querySelector('div[id="notifications-drawer"]');


            expect(notificationDrawer).not.toBe(null);


            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();


        });


    });


});
