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

import '../../node_modules/@patternfly/patternfly/patternfly.css'


import Header from "../components/page/Header";
import Navbar from "../components/page/Navbar";
import Footer from "../components/page/Footer";


const RootLayout = () => {

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
            masthead={<Header
                isSidebarOpen = {isSidebarOpen}
                onSidebarToggle = {onSidebarToggle}
            />}
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
                            flexDirection: "columnn",
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
