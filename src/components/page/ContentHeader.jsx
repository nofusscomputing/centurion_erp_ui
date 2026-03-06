import { Link } from "react-router";

import {
    Breadcrumb,
    BreadcrumbHeading,
    BreadcrumbItem,
    Divider,
    PageBreadcrumb,
    PageSection,
    Title
} from "@patternfly/react-core";



const ContentHeader = ({
    content_heading,
    content_header_icon = null,
    back_url = null,
    back_name = null
}) => {


    const BreadcrumbWithHeading = () => {
    
        return (
            <Breadcrumb>
                <BreadcrumbItem><Link to={back_url}>{back_name}</Link></BreadcrumbItem>
                <BreadcrumbHeading to="#">{content_heading}</BreadcrumbHeading>
            </Breadcrumb>
        );
    }


    return (
        <>
        {back_url && <PageBreadcrumb><BreadcrumbWithHeading /></PageBreadcrumb>}
        <PageSection
            aria-labelledby="content-header"
            isCenterAligned = {true}
            isFilled={false}
        >
            <div
                style={{
                    display: "flex",
                }}
            >
                <Title style={{ width: "50%"}} headingLevel="h2">{content_heading}</Title>
                <div style={{ width: "50%", textAlign: "right"}}>{content_header_icon}</div>
            </div>
            <Divider />
        </PageSection>
        </>
    );
}

export default ContentHeader;
