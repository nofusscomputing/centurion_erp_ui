import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    Outlet,
    useNavigate,
    useParams
} from "react-router";

import {
    AlertGroup,
    BackToTop,
    Breadcrumb,
    BreadcrumbHeading,
    BreadcrumbItem,
    Content,
    Divider,
    Page,
    PageBreadcrumb,
    PageGroup,
    PageSection,
    Spinner,
    Title,
} from '@patternfly/react-core';

//@ts-expect-error TS[2822]
import '../../node_modules/@patternfly/patternfly/patternfly.css'

import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";
import {
    NotificationContext,
    Notifications
} from "../components/NotificationDrawer";
import { apiFetch } from "../hooks/apiFetch";
import { PageHeader } from "@patternfly/react-component-groups";

/**
 * This Layout is the root Layout that corresponds with the root route.
 * 
 * The outlet expects that the first child route will be wrapped in
 * a {@link @patternfly/react-core#PageSection} component. Notification
 * provider {@link NotificationContext} is provided as part of this layout
 * and is usable in all child routes.
 * 
 * @summary Common Page Layout
 * 
 * @category Layout
 * @since 0.1.0
 */
const RootLayout = (): React.JSX.Element => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const onSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [pageHeading, setPageHeading ] = useState(null);

    const [pageDescription, setPageDescription ] = useState(null);

    const [ pageHeaderIcons, setPageHeaderIcons ] = useState(null);

    const params = useParams();

    // notifications

    const alertTimeout = 8000;

    const drawerRef = useRef(null);

    const maxDisplayedAlerts = 2;

    const maxAlerts = 100;

    const minAlerts = 0;

    const [ alerts, setAlerts ] = useState([])

    const [ isNotificationsOpen, setNotificationsOpen ] = useState(false);

    const [maxDisplayed, setMaxDisplayed] = useState(maxDisplayedAlerts);

    const [overflowMessage, setOverflowMessage] = useState('');

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    // const [notifications, setNotifications] = useState<UINotification[]>([]);

    const [rootMetadata, setRootMetadata ] = useState(null);

    useEffect(() => {

        if( rootMetadata === null ) {

            apiFetch(
                '',
                (data) => {

                    setRootMetadata(data)

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


    const onAlertGroupOverflowClick = () => {

        setAlerts([]);

        setNotificationsOpen(true);

    }


    document.title = `${pageHeading}`

    const rootPageBreadcrumb = (

        <Breadcrumb>

            <BreadcrumbItem>{params.module}</BreadcrumbItem>

            <BreadcrumbItem
                to={`/${params.module}/${params.model}`}
                component = {(props) => <Link {...props} to={props.href} />}
            >
                {params.model}
            </BreadcrumbItem>

            {(params?.ticket_sub_model || params?.sub_model) &&
            <BreadcrumbItem
                to={`/${params.module}/${params.model}/${params.pk}`}
                component = {(props) => <Link {...props} to={props.href} />}
            >
                {params.pk}
            </BreadcrumbItem> }

            {params?.sub_model && <BreadcrumbItem>{params.sub_model}</BreadcrumbItem>}

            {params?.ticket_sub_model && <BreadcrumbItem>{params.ticket_sub_model}</BreadcrumbItem>}

            {(params?.ticket_sub_model || params?.sub_model) && <BreadcrumbHeading>{pageHeading}</BreadcrumbHeading>}

            {params.pk && ! params?.sub_model && ! params?.ticket_sub_model &&
            <BreadcrumbHeading to="#">{params.pk && pageHeading}</BreadcrumbHeading>}

        </Breadcrumb>

    );


    return (
        <>
        { ! rootMetadata && <Spinner diameter="80px" aria-label="Page loading spinner" /> }
        {rootMetadata &&
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
        <Page
            isManagedSidebar
            breadcrumb = {rootPageBreadcrumb}
            breadcrumbProps={{
                stickyOnBreakpoint: {
                    md: 'top'
                }
            }}
            isContentFilled
            masthead = {<Header
                isSidebarOpen = {isSidebarOpen}
                onSidebarToggle = {onSidebarToggle}
            />}
            mainContainerId={"scrollable-element"}
            notificationDrawer = {<Notifications />}
            isNotificationDrawerExpanded = {isNotificationsOpen}
            sidebar = {<Navbar
                isSidebarOpen = {isSidebarOpen}
                navigation_entries = {rootMetadata.navigation}
            />}
        >

            <AlertGroup
                hasAnimations
                isToast
                isLiveRegion
                overflowMessage={overflowMessage}
                onOverflowClick={onAlertGroupOverflowClick}
            >
                {alerts.slice(0, maxDisplayed)}
            </AlertGroup>

            <PageGroup
                aria-label="Page"
                id="page-main"
                hasOverflowScroll
            >

                <PageSection>

                    {pageHeading && <Content>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            <Title headingLevel="h1" style={{ width: "50%", minWidth: "350px"}}>
                                {pageHeading}
                            </Title>
                            <div style={{ width: "50%", textAlign: "right", minWidth: "350px"}}>{pageHeaderIcons}</div>
                        </div>

                        <Divider />

                        <p>{pageDescription}</p>

                    </Content>}

                </PageSection>

                <Outlet context={{
                    setPageDescription, setPageHeading, setPageHeaderIcons,
                }}
                />
                <Footer
                    api_version_data = {rootMetadata.version}
                />

            </PageGroup>

            <BackToTop scrollableSelector="#page-main" />

        </Page>

        </NotificationContext.Provider>
        }
        </>
    );
}

export default RootLayout;
