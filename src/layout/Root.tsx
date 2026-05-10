import {
    useState,
} from "react";

import {
    Outlet,
    useParams
} from "react-router";


import {
    Breadcrumb,
    BreadcrumbHeading,
    BreadcrumbItem,
    Content,
    Divider,
    Page,
    PageBreadcrumb,
    PageSection,
    Title,
} from '@patternfly/react-core';

//@ts-expect-error TS[2822]
import '../../node_modules/@patternfly/patternfly/patternfly.css'


import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";

/**
 * This Layout is the root Layout that corresponds with the root route.
 * 
 * The outlet expects that the first child route will be wrapped in
 * a {@link @patternfly/react-core#PageSection} component 
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


    document.title = `${pageHeading}`

    return (
        <Page
            isManagedSidebar
            isContentFilled
            //@ts-expect-error TS[2322]
            masthead={<Header
                isSidebarOpen = {isSidebarOpen}
                onSidebarToggle = {onSidebarToggle}
            />}
            //@ts-expect-error TS[2322]
            sidebar={<Navbar
                isSidebarOpen = {isSidebarOpen}
            />}
        >

            <PageBreadcrumb
                className="pf-m-sticky-top"
            >
                <Breadcrumb>

                    <BreadcrumbItem>{params.module}</BreadcrumbItem>

                    <BreadcrumbItem>{params.model}</BreadcrumbItem>

                    {params.pk && <BreadcrumbHeading to="#">{params.pk && pageHeading}</BreadcrumbHeading>}

                </Breadcrumb>

            </PageBreadcrumb>

            <PageSection>

                {pageHeading && <Content>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
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
                setPageDescription, setPageHeading, setPageHeaderIcons
            }}/>
        
            <Footer />

        </Page>
    );
}

export default RootLayout;
